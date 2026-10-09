// ============================================================
// CAMPUS TYCOON — Core Type Definitions
// ============================================================

export type ZoneType = 'academic' | 'student-life' | 'administration' | 'infrastructure';

export type ScreenName =
  | 'home'
  | 'new-game'
  | 'game'
  | 'analytics'
  | 'decision-log'
  | 'student'
  | 'about'
  | 'leaderboard'
  | 'how-to-play';

export type GameGoal =
  | 'academic-excellence'
  | 'student-experience'
  | 'financial-stability'
  | 'sustainable-campus'
  | 'balanced-university';

export type Difficulty = 'easy' | 'standard' | 'challenge';

export type Semester = 'Fall' | 'Spring' | 'Summer';

export interface BuildingDef {
  id: string;
  name: string;
  zone: ZoneType;
  cost: number;
  capacity: number;
  maintenance: number;
  academicImpact: number;
  satisfactionImpact: number;
  staffRequirement: number;
  sustainabilityImpact: number;
  constructionTime: number; // months
  description: string;
  iconName: string; // lucide icon name
  upgradeLevels: BuildingUpgradeDef[];
}

export interface BuildingUpgradeDef {
  level: number;
  name: string;
  cost: number;
  capacityBonus: number;
  academicBonus: number;
  satisfactionBonus: number;
  maintenanceIncrease: number;
  sustainabilityBonus: number;
  description: string;
}

export interface ConstructedBuilding {
  uid: string;
  defId: string;
  level: number;
  condition: number; // 0-100
  monthsUnderConstruction: number;
  completed: boolean;
  repairCostBase: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: 'opportunity' | 'crisis' | 'student' | 'financial' | 'academic';
  choices: EventChoice[];
  minYear: number;
  weight: number;
  condition?: (state: GameState) => boolean;
}

export interface EventChoice {
  label: string;
  description: string;
  apply: (state: GameState) => Partial<GameState> & { eventMessage?: string };
}

export interface DecisionLogEntry {
  id: string;
  year: number;
  semester: Semester;
  month: number;
  decision: string;
  cost: number;
  outcome: string;
  category: 'build' | 'upgrade' | 'repair' | 'hire' | 'finance' | 'policy' | 'research' | 'sustainability' | 'event' | 'time';
}

export interface HistoryPoint {
  label: string;
  budget: number;
  students: number;
  reputation: number;
  satisfaction: number;
  academicQuality: number;
  sustainability: number;
}

export interface SatisfactionFactor {
  label: string;
  value: number; // positive or negative
}

export interface StaffGroup {
  faculty: number;
  seniorFaculty: number;
  researchStaff: number;
  administrators: number;
  maintenance: number;
  studentSupport: number;
}

export interface ResearchArea {
  id: string;
  name: string;
  level: number;
  investment: number;
}

export interface SustainabilityUpgrade {
  id: string;
  name: string;
  cost: number;
  sustainabilityBoost: number;
  maintenanceReduction: number;
  description: string;
  purchased: boolean;
  iconName: string;
}

export interface GameConfig {
  startingBudget: number;
  startingStudents: number;
  startingFaculty: number;
  startingStaff: number;
  startingCapacity: number;
  startingReputation: number;
  startingSatisfaction: number;
  startingAcademicQuality: number;
  startingSustainability: number;
  eventFrequency: number; // 0-1 probability per month
  maintenanceMultiplier: number;
  enrollmentPressure: number;
  financialConstraint: number;
}

export interface GameState {
  universityName: string;
  goal: GameGoal;
  difficulty: Difficulty;
  year: number;
  semester: Semester;
  month: number; // 1-12
  budget: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  students: number;
  studentCapacity: number;
  housingCapacity: number;
  faculty: StaffGroup;
  staff: number;
  reputation: number;
  satisfaction: number;
  academicQuality: number;
  sustainability: number;
  tuition: number;
  buildings: ConstructedBuilding[];
  research: ResearchArea[];
  sustainabilityUpgrades: SustainabilityUpgrade[];
  decisionLog: DecisionLogEntry[];
  history: HistoryPoint[];
  pendingEvent: GameEvent | null;
  semesterReview: SemesterReview | null;
  yearlyReport: YearlyReport | null;
  gameOver: boolean;
  gameOverReason: string;
  won: boolean;
  warning: string | null;
  consecutivePositiveCashFlow: number;
  totalRevenue: number;
  totalExpenses: number;
  satisfactionFactors: SatisfactionFactor[];
  monthsPlayed: number;
}

export interface SemesterReview {
  year: number;
  semester: Semester;
  satisfactionChange: number;
  academicChange: number;
  revenue: number;
  expenses: number;
  reputationChange: number;
  enrollmentChange: number;
  summary: string;
}

export interface YearlyReport {
  year: number;
  students: number;
  satisfaction: number;
  academicQuality: number;
  reputation: number;
  budget: number;
  sustainability: number;
  whatWentWell: string[];
  areasToImprove: string[];
  majorDecisions: string[];
  financialSummary: string;
  nextYearOutlook: string;
}

export interface LeaderboardEntry {
  universityName: string;
  yearsSurvived: number;
  finalScore: number;
  mainAchievement: string;
  goal: GameGoal;
  difficulty: Difficulty;
  date: string;
}

export interface SaveSlot {
  id: string;
  state: GameState;
  savedAt: string;
}
