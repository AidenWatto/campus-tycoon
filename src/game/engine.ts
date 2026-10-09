import type {
  GameState,
  SemesterReview,
  YearlyReport,
  DecisionLogEntry,
  SatisfactionFactor,
  Semester,
  GameEvent,
  ConstructedBuilding,
  StaffGroup,
} from './types';
import {
  BUILDING_DEFS,
  DIFFICULTY_CONFIGS,
  GAME_EVENTS,
  RESEARCH_AREAS,
  SUSTAINABILITY_UPGRADES,
  RESEARCH_COSTS,
} from './data';

// ============================================================
// ID GENERATION
// ============================================================

let idCounter = 0;
export function genId(prefix = 'id'): string {
  idCounter++;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

// ============================================================
// CREATE INITIAL STATE
// ============================================================

export function createInitialState(
  universityName: string,
  goal: GameState['goal'],
  difficulty: GameState['difficulty']
): GameState {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const faculty: StaffGroup = {
    faculty: Math.round(config.startingFaculty * 0.6),
    seniorFaculty: Math.round(config.startingFaculty * 0.25),
    researchStaff: Math.round(config.startingFaculty * 0.15),
    administrators: Math.round(config.startingStaff * 0.4),
    maintenance: Math.round(config.startingStaff * 0.35),
    studentSupport: Math.round(config.startingStaff * 0.25),
  };

  const startingBuildings: ConstructedBuilding[] = [
    { uid: genId('b'), defId: 'lecture-hall', level: 1, condition: 80, monthsUnderConstruction: 0, completed: true, repairCostBase: 15_000 },
    { uid: genId('b'), defId: 'library', level: 1, condition: 75, monthsUnderConstruction: 0, completed: true, repairCostBase: 20_000 },
    { uid: genId('b'), defId: 'admin-building', level: 1, condition: 85, monthsUnderConstruction: 0, completed: true, repairCostBase: 12_000 },
    { uid: genId('b'), defId: 'cafeteria', level: 1, condition: 70, monthsUnderConstruction: 0, completed: true, repairCostBase: 10_000 },
    { uid: genId('b'), defId: 'residence-hall', level: 1, condition: 72, monthsUnderConstruction: 0, completed: true, repairCostBase: 18_000 },
  ];

  const housingCapacity = startingBuildings
    .filter((b) => b.defId === 'residence-hall')
    .reduce((sum, b) => sum + BUILDING_DEFS.find((d) => d.id === b.defId)!.capacity, 0);

  return {
    universityName,
    goal,
    difficulty,
    year: 1,
    semester: 'Fall',
    month: 8, // August start
    budget: config.startingBudget,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    students: config.startingStudents,
    studentCapacity: config.startingCapacity,
    housingCapacity,
    faculty,
    staff: config.startingStaff,
    reputation: config.startingReputation,
    satisfaction: config.startingSatisfaction,
    academicQuality: config.startingAcademicQuality,
    sustainability: config.startingSustainability,
    tuition: 12_000,
    buildings: startingBuildings,
    research: RESEARCH_AREAS.map((r) => ({ ...r })),
    sustainabilityUpgrades: SUSTAINABILITY_UPGRADES.map((u) => ({ ...u })),
    decisionLog: [],
    history: [],
    pendingEvent: null,
    semesterReview: null,
    yearlyReport: null,
    gameOver: false,
    gameOverReason: '',
    won: false,
    warning: null,
    consecutivePositiveCashFlow: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    satisfactionFactors: [],
    monthsPlayed: 0,
  };
}

// ============================================================
// FINANCIAL CALCULATIONS
// ============================================================

export function calculateMonthlyIncome(state: GameState): number {
  const tuitionIncome = (state.students * state.tuition) / 12;
  const housingIncome = (Math.min(state.students, state.housingCapacity) * 4_000) / 12;
  const grantIncome = (state.reputation / 100) * 50_000 * (1 + state.academicQuality / 100);
  const eventIncome = (state.reputation / 100) * 15_000;
  const donationIncome = (state.reputation / 100) * 20_000;
  return Math.round(tuitionIncome + housingIncome + grantIncome + eventIncome + donationIncome);
}

export function calculateMonthlyExpenses(state: GameState): number {
  const config = DIFFICULTY_CONFIGS[state.difficulty];
  const salaries =
    state.faculty.faculty * 6_000 +
    state.faculty.seniorFaculty * 9_000 +
    state.faculty.researchStaff * 7_500 +
    state.faculty.administrators * 5_500 +
    state.faculty.maintenance * 4_500 +
    state.faculty.studentSupport * 4_800;
  const monthlySalaries = salaries / 12;

  const maintenance = state.buildings
    .filter((b) => b.completed)
    .reduce((sum, b) => {
      const def = BUILDING_DEFS.find((d) => d.id === b.defId);
      if (!def) return sum;
      let maint = def.maintenance;
      for (let i = 1; i < b.level; i++) {
        maint += def.upgradeLevels[i - 1]?.maintenanceIncrease ?? 0;
      }
      return sum + maint;
    }, 0);

  const sustainabilityReduction = state.sustainabilityUpgrades
    .filter((u) => u.purchased)
    .reduce((sum, u) => sum + u.maintenanceReduction, 0);

  const utilities = state.buildings.filter((b) => b.completed).length * 3_000;
  const studentServices = state.faculty.studentSupport * 500;

  return Math.round((monthlySalaries + maintenance + utilities + studentServices - sustainabilityReduction) * config.maintenanceMultiplier);
}

// ============================================================
// SATISFACTION FACTORS
// ============================================================

export function calculateSatisfactionFactors(state: GameState): SatisfactionFactor[] {
  const factors: SatisfactionFactor[] = [];
  const config = DIFFICULTY_CONFIGS[state.difficulty];

  // Housing
  if (state.students <= state.housingCapacity) {
    factors.push({ label: 'Housing availability', value: 5 });
  } else {
    factors.push({ label: 'Housing shortage', value: -Math.min(15, Math.floor((state.students - state.housingCapacity) / 20)) });
  }

  // Campus facilities (completed buildings with satisfaction impact)
  const facilityScore = state.buildings
    .filter((b) => b.completed)
    .reduce((sum, b) => {
      const def = BUILDING_DEFS.find((d) => d.id === b.defId);
      if (!def) return sum;
      let impact = def.satisfactionImpact;
      for (let i = 1; i < b.level; i++) impact += def.upgradeLevels[i - 1]?.satisfactionBonus ?? 0;
      return sum + impact;
    }, 0);
  if (facilityScore > 0) factors.push({ label: 'Campus facilities', value: Math.min(12, facilityScore) });

  // Student services (staff)
  const supportImpact = Math.min(8, state.faculty.studentSupport);
  if (supportImpact > 0) factors.push({ label: 'Student services', value: supportImpact });

  // Academic quality
  if (state.academicQuality >= 70) factors.push({ label: 'Academic excellence', value: 5 });
  else if (state.academicQuality < 45) factors.push({ label: 'Poor academics', value: -5 });

  // Tuition level
  if (state.tuition > 15_000) factors.push({ label: 'High tuition', value: -Math.min(10, Math.floor((state.tuition - 12000) / 1000)) });
  else if (state.tuition < 10_000) factors.push({ label: 'Affordable tuition', value: 4 });

  // Building conditions
  const avgCondition = state.buildings.filter((b) => b.completed).length > 0
    ? state.buildings.filter((b) => b.completed).reduce((sum, b) => sum + b.condition, 0) / state.buildings.filter((b) => b.completed).length
    : 100;
  if (avgCondition < 50) factors.push({ label: 'Poor campus condition', value: -8 });
  else if (avgCondition < 70) factors.push({ label: 'Worn facilities', value: -3 });

  // Capacity stress
  if (state.students > state.studentCapacity * 0.95) {
    factors.push({ label: 'Overcrowding', value: -6 });
  }

  // Reputation
  if (state.reputation >= 70) factors.push({ label: 'Prestigious campus', value: 4 });

  return factors;
}

// ============================================================
// ADVANCE ONE MONTH
// ============================================================

export function advanceMonth(state: GameState): GameState {
  if (state.gameOver || state.won) return state;

  let s = { ...state };
  s.monthsPlayed++;

  // Advance month
  s.month++;
  if (s.month > 12) {
    s.month = 1;
    s.year++;
  }

  // Update semester
  if (s.month >= 8 && s.month <= 12) s.semester = 'Fall';
  else if (s.month >= 1 && s.month <= 5) s.semester = 'Spring';
  else s.semester = 'Summer';

  // Construction progress
  s.buildings = s.buildings.map((b) => {
    if (!b.completed) {
      const newMonths = b.monthsUnderConstruction + 1;
      const def = BUILDING_DEFS.find((d) => d.id === b.defId)!;
      if (newMonths >= def.constructionTime) {
        return { ...b, completed: true, monthsUnderConstruction: 0, condition: 100 };
      }
      return { ...b, monthsUnderConstruction: newMonths };
    }
    // Building condition degrades
    const newCondition = Math.max(0, b.condition - 0.8);
    return { ...b, condition: newCondition };
  });

  // Recalculate capacity
  s.studentCapacity = calculateStudentCapacity(s);
  s.housingCapacity = calculateHousingCapacity(s);

  // Financial calculations
  const income = calculateMonthlyIncome(s);
  const expenses = calculateMonthlyExpenses(s);
  const netCashFlow = income - expenses;
  s.budget += netCashFlow;
  s.monthlyIncome = income;
  s.monthlyExpenses = expenses;
  s.totalRevenue += income;
  s.totalExpenses += expenses;

  // Track consecutive positive cash flow (per year)
  if (netCashFlow > 0) {
    s.consecutivePositiveCashFlow++;
  } else {
    s.consecutivePositiveCashFlow = 0;
  }

  // Student changes (gradual, based on reputation, satisfaction, capacity)
  const enrollmentRate = (s.reputation / 100) * 0.04 * DIFFICULTY_CONFIGS[s.difficulty].enrollmentPressure;
  const retentionRate = s.satisfaction / 100;
  const dropoutRate = (1 - retentionRate) * 0.03;

  // Only enroll new students during Fall and Spring
  if (s.semester !== 'Summer') {
    const newStudents = Math.round(s.students * enrollmentRate);
    const dropouts = Math.round(s.students * dropoutRate);
    s.students = Math.max(0, s.students + newStudents - dropouts);
  } else {
    const dropouts = Math.round(s.students * dropoutRate * 0.5);
    s.students = Math.max(0, s.students - dropouts);
  }

  // Cap students at capacity * 1.1 (some overflow allowed)
  if (s.students > s.studentCapacity * 1.1) {
    s.students = Math.round(s.studentCapacity * 1.1);
  }

  // Metric drift toward equilibrium based on factors
  s.satisfactionFactors = calculateSatisfactionFactors(s);
  const factorSum = s.satisfactionFactors.reduce((sum, f) => sum + f.value, 0);
  // Satisfaction drifts toward 50 + factorSum
  const satisfactionTarget = Math.max(0, Math.min(100, 50 + factorSum));
  s.satisfaction = Math.round(s.satisfaction + (satisfactionTarget - s.satisfaction) * 0.15);

  // Academic quality drifts based on faculty ratio and research
  const totalFaculty = s.faculty.faculty + s.faculty.seniorFaculty + s.faculty.researchStaff;
  const studentFacultyRatio = totalFaculty > 0 ? s.students / totalFaculty : 999;
  let academicTarget = 40;
  if (studentFacultyRatio < 15) academicTarget += 25;
  else if (studentFacultyRatio < 20) academicTarget += 18;
  else if (studentFacultyRatio < 25) academicTarget += 10;
  else if (studentFacultyRatio < 30) academicTarget += 3;
  else academicTarget -= 5;

  // Building academic impact
  const buildingAcademic = s.buildings
    .filter((b) => b.completed)
    .reduce((sum, b) => {
      const def = BUILDING_DEFS.find((d) => d.id === b.defId);
      if (!def) return sum;
      let impact = def.academicImpact;
      for (let i = 1; i < b.level; i++) impact += def.upgradeLevels[i - 1]?.academicBonus ?? 0;
      return sum + impact;
    }, 0);
  academicTarget += buildingAcademic * 0.5;

  // Research impact
  const totalResearchLevel = s.research.reduce((sum, r) => sum + r.level, 0);
  academicTarget += totalResearchLevel * 2;

  // Senior faculty bonus
  academicTarget += s.faculty.seniorFaculty * 0.5;

  academicTarget = Math.max(0, Math.min(100, academicTarget));
  s.academicQuality = Math.round(s.academicQuality + (academicTarget - s.academicQuality) * 0.1);

  // Reputation drifts toward (satisfaction + academicQuality + sustainability) / 3
  const reputationTarget = (s.satisfaction + s.academicQuality + s.sustainability) / 3;
  s.reputation = Math.round(s.reputation + (reputationTarget - s.reputation) * 0.08);
  s.reputation = Math.max(0, Math.min(100, s.reputation));

  // Sustainability drifts based on upgrades and buildings
  const buildingSustainability = s.buildings
    .filter((b) => b.completed)
    .reduce((sum, b) => {
      const def = BUILDING_DEFS.find((d) => d.id === b.defId);
      if (!def) return sum;
      let impact = def.sustainabilityImpact;
      for (let i = 1; i < b.level; i++) impact += def.upgradeLevels[i - 1]?.sustainabilityBonus ?? 0;
      return sum + impact;
    }, 0);
  const upgradeSustainability = s.sustainabilityUpgrades
    .filter((u) => u.purchased)
    .reduce((sum, u) => sum + u.sustainabilityBoost, 0);
  const sustainabilityTarget = Math.max(0, Math.min(100, 35 + buildingSustainability + upgradeSustainability));
  s.sustainability = Math.round(s.sustainability + (sustainabilityTarget - s.sustainability) * 0.1);

  // Check for random event
  const config = DIFFICULTY_CONFIGS[s.difficulty];
  if (!s.pendingEvent && Math.random() < config.eventFrequency) {
    s.pendingEvent = pickEvent(s);
  }

  // Record history at semester boundaries
  if (s.month === 12 || s.month === 5) {
    s.history = [...s.history, {
      label: `Y${s.year} ${s.semester}`,
      budget: s.budget,
      students: s.students,
      reputation: s.reputation,
      satisfaction: s.satisfaction,
      academicQuality: s.academicQuality,
      sustainability: s.sustainability,
    }];
  }

  // Check warnings
  s.warning = checkWarnings(s);

  // Check game over
  const gameOverCheck = checkGameOver(s);
  if (gameOverCheck) {
    s.gameOver = true;
    s.gameOverReason = gameOverCheck;
  }

  // Check win
  if (checkWin(s)) {
    s.won = true;
  }

  return s;
}

// ============================================================
// ADVANCE TO END OF SEMESTER
// ============================================================

export function advanceToSemesterEnd(state: GameState): GameState {
  let s = { ...state };
  const startSemester = s.semester;
  const startYear = s.year;

  let iterations = 0;
  while (s.semester === startSemester && s.year === startYear && !s.gameOver && !s.won && !s.pendingEvent && iterations < 10) {
    s = advanceMonth(s);
    iterations++;
  }

  // If we ended the semester (not due to event/gameover), generate review
  if ((s.semester !== startSemester || s.year !== startYear) && !s.gameOver && !s.won && !s.pendingEvent) {
    s.semesterReview = generateSemesterReview(s, startSemester, startYear);
  }

  return s;
}

// ============================================================
// SEMESTER REVIEW
// ============================================================

function generateSemesterReview(state: GameState, prevSemester: Semester, prevYear: number): SemesterReview {
  const review: SemesterReview = {
    year: prevYear,
    semester: prevSemester,
    satisfactionChange: 0,
    academicChange: 0,
    revenue: 0,
    expenses: 0,
    reputationChange: 0,
    enrollmentChange: 0,
    summary: '',
  };

  // Compare with last history point
  const lastPoint = state.history[state.history.length - 1];
  if (lastPoint) {
    review.satisfactionChange = state.satisfaction - lastPoint.satisfaction;
    review.academicChange = state.academicQuality - lastPoint.academicQuality;
    review.reputationChange = state.reputation - lastPoint.reputation;
    review.enrollmentChange = state.students - lastPoint.students;
  }

  // Approximate semester finances
  review.revenue = Math.round(state.monthlyIncome * 5);
  review.expenses = Math.round(state.monthlyExpenses * 5);

  const net = review.revenue - review.expenses;
  review.summary = `Net cash flow: ${net >= 0 ? '+' : ''}$${Math.abs(net).toLocaleString()}. Enrollment ${review.enrollmentChange >= 0 ? 'grew' : 'shrank'} by ${Math.abs(review.enrollmentChange)} students.`;

  return review;
}

// ============================================================
// YEARLY REPORT
// ============================================================

export function generateYearlyReport(state: GameState): YearlyReport {
  const report: YearlyReport = {
    year: state.year - 1,
    students: state.students,
    satisfaction: state.satisfaction,
    academicQuality: state.academicQuality,
    reputation: state.reputation,
    budget: state.budget,
    sustainability: state.sustainability,
    whatWentWell: [],
    areasToImprove: [],
    majorDecisions: [],
    financialSummary: '',
    nextYearOutlook: '',
  };

  // What went well
  if (state.satisfaction >= 70) report.whatWentWell.push(`Student satisfaction is strong at ${state.satisfaction}/100.`);
  if (state.academicQuality >= 70) report.whatWentWell.push(`Academic quality is excellent at ${state.academicQuality}/100.`);
  if (state.reputation >= 70) report.whatWentWell.push(`University reputation is high at ${state.reputation}/100.`);
  if (state.sustainability >= 65) report.whatWentWell.push(`Sustainability score is healthy at ${state.sustainability}/100.`);
  if (state.budget > 1_000_000) report.whatWentWell.push(`Strong financial position with $${(state.budget / 1_000_000).toFixed(2)}M in reserves.`);
  if (state.students > 800) report.whatWentWell.push(`Growing student body with ${state.students} enrolled students.`);

  // Areas to improve
  if (state.satisfaction < 55) report.areasToImprove.push(`Student satisfaction is low at ${state.satisfaction}/100 — consider investing in campus life.`);
  if (state.academicQuality < 55) report.areasToImprove.push(`Academic quality needs attention at ${state.academicQuality}/100 — consider hiring faculty or building academic facilities.`);
  if (state.reputation < 50) report.areasToImprove.push(`Reputation is lagging at ${state.reputation}/100 — focus on academic and student improvements.`);
  if (state.sustainability < 45) report.areasToImprove.push(`Sustainability is below par at ${state.sustainability}/100 — invest in green infrastructure.`);
  if (state.budget < 200_000) report.areasToImprove.push(`Budget is critically low at $${state.budget.toLocaleString()} — reduce expenses or increase revenue.`);
  if (state.students > state.studentCapacity * 0.95) report.areasToImprove.push(`Campus is near capacity — consider expanding facilities.`);

  // Major decisions
  const yearDecisions = state.decisionLog.filter((d) => d.year === state.year - 1);
  report.majorDecisions = yearDecisions.slice(-8).map((d) => d.decision);

  // Financial summary
  const netCash = state.totalRevenue - state.totalExpenses;
  report.financialSummary = `Total revenue: $${state.totalRevenue.toLocaleString()}. Total expenses: $${state.totalExpenses.toLocaleString()}. Net: ${netCash >= 0 ? '+' : ''}$${Math.abs(netCash).toLocaleString()}.`;

  // Next year outlook
  if (state.reputation >= 65 && state.satisfaction >= 65) {
    report.nextYearOutlook = 'The university is well-positioned for growth. Expect strong enrollment demand.';
  } else if (state.budget < 300_000) {
    report.nextYearOutlook = 'Financial challenges ahead. Focus on stabilizing the budget before expanding.';
  } else if (state.satisfaction < 50) {
    report.nextYearOutlook = 'Student satisfaction needs urgent attention to prevent enrollment decline.';
  } else {
    report.nextYearOutlook = 'The university is stable but has room for improvement in several areas.';
  }

  return report;
}

// ============================================================
// CAPACITY CALCULATIONS
// ============================================================

export function calculateStudentCapacity(state: GameState): number {
  let capacity = 0;
  for (const b of state.buildings) {
    if (!b.completed) continue;
    const def = BUILDING_DEFS.find((d) => d.id === b.defId);
    if (!def) continue;
    let cap = def.capacity;
    for (let i = 1; i < b.level; i++) {
      cap += def.upgradeLevels[i - 1]?.capacityBonus ?? 0;
    }
    capacity += cap;
  }
  return capacity;
}

export function calculateHousingCapacity(state: GameState): number {
  let capacity = 0;
  for (const b of state.buildings) {
    if (!b.completed) continue;
    if (b.defId === 'residence-hall') {
      const def = BUILDING_DEFS.find((d) => d.id === b.defId);
      if (!def) continue;
      let cap = def.capacity;
      for (let i = 1; i < b.level; i++) {
        cap += def.upgradeLevels[i - 1]?.capacityBonus ?? 0;
      }
      capacity += cap;
    }
  }
  return capacity;
}

// ============================================================
// EVENT SELECTION
// ============================================================

function pickEvent(state: GameState): GameEvent | null {
  const available = GAME_EVENTS.filter((e) => {
    if (state.year < e.minYear) return false;
    if (e.condition && !e.condition(state)) return false;
    return true;
  });

  if (available.length === 0) return null;

  const totalWeight = available.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const e of available) {
    roll -= e.weight;
    if (roll <= 0) return e;
  }
  return available[0];
}

// ============================================================
// WARNINGS
// ============================================================

function checkWarnings(state: GameState): string | null {
  const monthlyNet = state.monthlyIncome - state.monthlyExpenses;
  if (state.budget < 200_000 && monthlyNet < 0) {
    return 'FINANCIAL WARNING: At the current spending rate, the university may become financially unstable within two semesters.';
  }
  if (state.satisfaction < 35) {
    return 'SATISFACTION WARNING: Student satisfaction is critically low. Enrollment may decline sharply.';
  }
  if (state.students > state.studentCapacity * 1.05) {
    return 'CAPACITY WARNING: The campus is over capacity. Consider expanding facilities.';
  }
  const avgCondition = state.buildings.filter((b) => b.completed).length > 0
    ? state.buildings.filter((b) => b.completed).reduce((sum, b) => sum + b.condition, 0) / state.buildings.filter((b) => b.completed).length
    : 100;
  if (avgCondition < 40) {
    return 'MAINTENANCE WARNING: Campus buildings are deteriorating. Repairs needed urgently.';
  }
  return null;
}

// ============================================================
// GAME OVER CHECK
// ============================================================

function checkGameOver(state: GameState): string | null {
  if (state.budget < -500_000) {
    return 'The university has gone bankrupt. The board has voted to shut down operations.';
  }
  if (state.satisfaction < 10) {
    return 'Student satisfaction has collapsed. Mass transfers have left the university unable to operate.';
  }
  if (state.students < 50) {
    return 'Enrollment has dropped below sustainable levels. The university must close.';
  }
  return null;
}

// ============================================================
// WIN CHECK
// ============================================================

export function checkWin(state: GameState): boolean {
  switch (state.goal) {
    case 'academic-excellence':
      return state.academicQuality >= 90;
    case 'student-experience':
      return state.satisfaction >= 90;
    case 'financial-stability':
      return state.consecutivePositiveCashFlow >= 60; // 5 years of monthly positive cash flow
    case 'sustainable-campus':
      return state.sustainability >= 90;
    case 'balanced-university':
      return (
        state.reputation >= 75 &&
        state.satisfaction >= 75 &&
        state.academicQuality >= 75 &&
        state.sustainability >= 75
      );
    default:
      return false;
  }
}

// ============================================================
// SCORING
// ============================================================

export function calculateScore(state: GameState): number {
  const metricScore = (state.reputation + state.satisfaction + state.academicQuality + state.sustainability) * 10;
  const budgetScore = Math.max(0, state.budget / 100);
  const studentScore = state.students * 5;
  const yearBonus = state.year * 1000;
  const goalBonus = state.won ? 5000 : 0;
  return Math.round(metricScore + budgetScore + studentScore + yearBonus + goalBonus);
}

// ============================================================
// DECISION LOG HELPER
// ============================================================

export function makeDecision(
  state: GameState,
  decision: string,
  cost: number,
  outcome: string,
  category: DecisionLogEntry['category']
): DecisionLogEntry {
  return {
    id: genId('dec'),
    year: state.year,
    semester: state.semester,
    month: state.month,
    decision,
    cost,
    outcome,
    category,
  };
}
