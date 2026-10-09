import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { GameState, DecisionLogEntry, GameGoal, Difficulty, ScreenName } from './types';
import {
  createInitialState,
  advanceMonth,
  advanceToSemesterEnd,
  calculateMonthlyIncome,
  calculateMonthlyExpenses,
  calculateStudentCapacity,
  calculateHousingCapacity,
  calculateSatisfactionFactors,
  calculateScore,
  makeDecision,
  generateYearlyReport,
  checkWin,
} from './engine';
import { BUILDING_DEFS, RESEARCH_COSTS, DIFFICULTY_CONFIGS } from './data';
import { saveGame, loadGame, hasSave, deleteSave, getLeaderboard, addToLeaderboard } from './storage';
import type { LeaderboardEntry } from './types';

// ============================================================
// CONTEXT TYPE
// ============================================================

interface GameContextType {
  state: GameState | null;
  screen: ScreenName;
  setScreen: (s: ScreenName) => void;
  startNewGame: (name: string, goal: GameGoal, difficulty: Difficulty) => void;
  continueGame: () => void;
  save: () => void;
  hasSavedGame: boolean;
  advanceOneMonth: () => void;
  advanceSemester: () => void;
  buildBuilding: (defId: string) => void;
  upgradeBuilding: (uid: string) => void;
  repairBuilding: (uid: string) => void;
  hireFaculty: (type: 'faculty' | 'seniorFaculty' | 'researchStaff') => void;
  hireStaff: (type: 'administrators' | 'maintenance' | 'studentSupport') => void;
  setTuition: (amount: number) => void;
  fundResearch: (areaId: string) => void;
  buySustainability: (upgradeId: string) => void;
  resolveEvent: (choiceIndex: number) => void;
  dismissSemesterReview: () => void;
  dismissYearlyReport: () => void;
  dismissWarning: () => void;
  gameOverToLeaderboard: () => void;
  leaderboard: LeaderboardEntry[];
}

// ============================================================
// REDUCER
// ============================================================

type Action =
  | { type: 'SET_STATE'; state: GameState }
  | { type: 'SET_SCREEN'; screen: ScreenName }
  | { type: 'CLEAR_STATE' };

function reducer(state: { gameState: GameState | null; screen: ScreenName }, action: Action) {
  switch (action.type) {
    case 'SET_STATE':
      return { gameState: action.state, screen: state.screen };
    case 'SET_SCREEN':
      return { gameState: state.gameState, screen: action.screen };
    case 'CLEAR_STATE':
      return { gameState: null, screen: 'home' as ScreenName };
    default:
      return state;
  }
}

// ============================================================
// CONTEXT
// ============================================================

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [internal, dispatch] = useReducer(reducer, { gameState: null, screen: 'home' as ScreenName });

  const setState = useCallback((state: GameState) => {
    dispatch({ type: 'SET_STATE', state });
  }, []);

  const setScreen = useCallback((screen: ScreenName) => {
    dispatch({ type: 'SET_SCREEN', screen });
  }, []);

  const startNewGame = useCallback((name: string, goal: GameGoal, difficulty: Difficulty) => {
    const state = createInitialState(name, goal, difficulty);
    // Initial calculations
    state.monthlyIncome = calculateMonthlyIncome(state);
    state.monthlyExpenses = calculateMonthlyExpenses(state);
    state.studentCapacity = calculateStudentCapacity(state);
    state.housingCapacity = calculateHousingCapacity(state);
    state.satisfactionFactors = calculateSatisfactionFactors(state);
    setState(state);
    setScreen('game');
  }, [setState, setScreen]);

  const continueGame = useCallback(() => {
    const loaded = loadGame();
    if (loaded) {
      setState(loaded);
      setScreen('game');
    }
  }, [setState, setScreen]);

  const save = useCallback(() => {
    if (internal.gameState) saveGame(internal.gameState);
  }, [internal.gameState]);

  // Helper to update state and log decision
  const updateWithDecision = useCallback(
    (updater: (s: GameState) => GameState, decision?: DecisionLogEntry) => {
      if (!internal.gameState) return;
      let newState = updater(internal.gameState);
      if (decision) {
        newState = { ...newState, decisionLog: [...newState.decisionLog, decision] };
      }
      // Recalculate derived values
      newState.monthlyIncome = calculateMonthlyIncome(newState);
      newState.monthlyExpenses = calculateMonthlyExpenses(newState);
      newState.studentCapacity = calculateStudentCapacity(newState);
      newState.housingCapacity = calculateHousingCapacity(newState);
      newState.satisfactionFactors = calculateSatisfactionFactors(newState);
      // Check win
      if (checkWin(newState)) newState.won = true;
      setState(newState);
    },
    [internal.gameState, setState]
  );

  const advanceOneMonth = useCallback(() => {
    if (!internal.gameState) return;
    let newState = advanceMonth(internal.gameState);
    // Check for year transition for yearly report
    if (newState.month === 8 && newState.year > 1 && !newState.gameOver && !newState.won) {
      // Year transitioned — generate yearly report for previous year
      newState.yearlyReport = generateYearlyReport(newState);
    }
    setState(newState);
  }, [internal.gameState, setState]);

  const advanceSemester = useCallback(() => {
    if (!internal.gameState) return;
    let newState = advanceToSemesterEnd(internal.gameState);
    // Check for year transition
    if (newState.month === 8 && newState.year > 1 && !newState.gameOver && !newState.won && !newState.pendingEvent) {
      newState.yearlyReport = generateYearlyReport(newState);
    }
    setState(newState);
  }, [internal.gameState, setState]);

  const buildBuilding = useCallback((defId: string) => {
    if (!internal.gameState) return;
    const def = BUILDING_DEFS.find((d) => d.id === defId);
    if (!def) return;
    const state = internal.gameState;
    if (state.budget < def.cost) return;

    const newBuilding: GameState['buildings'][0] = {
      uid: `b-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      defId,
      level: 1,
      condition: 100,
      monthsUnderConstruction: 0,
      completed: false,
      repairCostBase: Math.round(def.cost * 0.05),
    };

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - def.cost,
        buildings: [...s.buildings, newBuilding],
      }),
      makeDecision(state, `Built ${def.name}`, def.cost, `Construction started (${def.constructionTime} months)`, 'build')
    );
  }, [internal.gameState, updateWithDecision]);

  const upgradeBuilding = useCallback((uid: string) => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const building = state.buildings.find((b) => b.uid === uid);
    if (!building || !building.completed) return;
    const def = BUILDING_DEFS.find((d) => d.id === building.defId);
    if (!def) return;
    const nextLevel = building.level + 1;
    if (nextLevel > def.upgradeLevels.length + 1) return;
    const upgrade = def.upgradeLevels[building.level - 1];
    if (!upgrade) return;
    if (state.budget < upgrade.cost) return;

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - upgrade.cost,
        buildings: s.buildings.map((b) =>
          b.uid === uid ? { ...b, level: nextLevel, condition: Math.min(100, b.condition + 10) } : b
        ),
      }),
      makeDecision(state, `Upgraded ${def.name} to ${upgrade.name}`, upgrade.cost, `Level ${nextLevel} — ${upgrade.description}`, 'upgrade')
    );
  }, [internal.gameState, updateWithDecision]);

  const repairBuilding = useCallback((uid: string) => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const building = state.buildings.find((b) => b.uid === uid);
    if (!building || !building.completed) return;
    const repairCost = Math.round(building.repairCostBase * (1 - building.condition / 100));
    if (state.budget < repairCost) return;
    const def = BUILDING_DEFS.find((d) => d.id === building.defId);

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - repairCost,
        buildings: s.buildings.map((b) =>
          b.uid === uid ? { ...b, condition: 100 } : b
        ),
      }),
      makeDecision(state, `Repaired ${def?.name ?? 'building'}`, repairCost, 'Condition restored to 100%', 'repair')
    );
  }, [internal.gameState, updateWithDecision]);

  const hireFaculty = useCallback((type: 'faculty' | 'seniorFaculty' | 'researchStaff') => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const costs = { faculty: 6_000, seniorFaculty: 9_000, researchStaff: 7_500 };
    const names = { faculty: 'Faculty Member', seniorFaculty: 'Senior Faculty', researchStaff: 'Research Staff' };
    const monthlySalary = costs[type];
    // Hiring bonus = 2 months salary
    const hireBonus = monthlySalary * 2;
    if (state.budget < hireBonus) return;

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - hireBonus,
        faculty: { ...s.faculty, [type]: s.faculty[type] + 1 },
      }),
      makeDecision(state, `Hired ${names[type]}`, hireBonus, `Monthly salary: $${monthlySalary.toLocaleString()}`, 'hire')
    );
  }, [internal.gameState, updateWithDecision]);

  const hireStaff = useCallback((type: 'administrators' | 'maintenance' | 'studentSupport') => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const costs = { administrators: 5_500, maintenance: 4_500, studentSupport: 4_800 };
    const names = { administrators: 'Administrator', maintenance: 'Maintenance Worker', studentSupport: 'Student Support Staff' };
    const monthlySalary = costs[type];
    const hireBonus = monthlySalary * 2;
    if (state.budget < hireBonus) return;

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - hireBonus,
        faculty: { ...s.faculty, [type]: s.faculty[type] + 1 },
        staff: s.staff + 1,
      }),
      makeDecision(state, `Hired ${names[type]}`, hireBonus, `Monthly salary: $${monthlySalary.toLocaleString()}`, 'hire')
    );
  }, [internal.gameState, updateWithDecision]);

  const setTuition = useCallback((amount: number) => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const change = amount - state.tuition;
    const satisfactionImpact = change > 0 ? -Math.min(10, Math.ceil(change / 1000)) : Math.min(5, Math.floor(-change / 2000));

    updateWithDecision(
      (s) => ({
        ...s,
        tuition: amount,
        satisfaction: Math.max(0, Math.min(100, s.satisfaction + satisfactionImpact)),
      }),
      makeDecision(state, `Set tuition to $${amount.toLocaleString()}/year`, 0, `Tuition ${change > 0 ? 'increased' : 'decreased'} by $${Math.abs(change).toLocaleString()}`, 'finance')
    );
  }, [internal.gameState, updateWithDecision]);

  const fundResearch = useCallback((areaId: string) => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const area = state.research.find((r) => r.id === areaId);
    if (!area) return;
    if (area.level >= RESEARCH_COSTS.length) return;
    const cost = RESEARCH_COSTS[area.level];
    if (state.budget < cost) return;

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - cost,
        research: s.research.map((r) =>
          r.id === areaId ? { ...r, level: r.level + 1, investment: r.investment + cost } : r
        ),
        academicQuality: Math.min(100, s.academicQuality + 2),
        reputation: Math.min(100, s.reputation + 1),
      }),
      makeDecision(state, `Funded ${area.name} research (Level ${area.level + 1})`, cost, 'Academic quality and reputation improved', 'research')
    );
  }, [internal.gameState, updateWithDecision]);

  const buySustainability = useCallback((upgradeId: string) => {
    if (!internal.gameState) return;
    const state = internal.gameState;
    const upgrade = state.sustainabilityUpgrades.find((u) => u.id === upgradeId);
    if (!upgrade || upgrade.purchased) return;
    if (state.budget < upgrade.cost) return;

    updateWithDecision(
      (s) => ({
        ...s,
        budget: s.budget - upgrade.cost,
        sustainabilityUpgrades: s.sustainabilityUpgrades.map((u) =>
          u.id === upgradeId ? { ...u, purchased: true } : u
        ),
        sustainability: Math.min(100, s.sustainability + upgrade.sustainabilityBoost),
      }),
      makeDecision(state, `Installed ${upgrade.name}`, upgrade.cost, `Sustainability +${upgrade.sustainabilityBoost}`, 'sustainability')
    );
  }, [internal.gameState, updateWithDecision]);

  const resolveEvent = useCallback((choiceIndex: number) => {
    if (!internal.gameState || !internal.gameState.pendingEvent) return;
    const event = internal.gameState.pendingEvent;
    const choice = event.choices[choiceIndex];
    if (!choice) return;
    const state = internal.gameState;
    const result = choice.apply(state);
    const { eventMessage, ...changes } = result;

    let newState: GameState = { ...state, ...changes, pendingEvent: null };
    newState.monthlyIncome = calculateMonthlyIncome(newState);
    newState.monthlyExpenses = calculateMonthlyExpenses(newState);
    newState.studentCapacity = calculateStudentCapacity(newState);
    newState.housingCapacity = calculateHousingCapacity(newState);
    newState.satisfactionFactors = calculateSatisfactionFactors(newState);
    if (checkWin(newState)) newState.won = true;

    const decision = makeDecision(state, `Event: ${event.title}`, 0, eventMessage ?? 'Resolved', 'event');
    newState.decisionLog = [...newState.decisionLog, decision];

    setState(newState);
  }, [internal.gameState, setState]);

  const dismissSemesterReview = useCallback(() => {
    if (!internal.gameState) return;
    setState({ ...internal.gameState, semesterReview: null });
  }, [internal.gameState, setState]);

  const dismissYearlyReport = useCallback(() => {
    if (!internal.gameState) return;
    setState({ ...internal.gameState, yearlyReport: null });
  }, [internal.gameState, setState]);

  const dismissWarning = useCallback(() => {
    if (!internal.gameState) return;
    setState({ ...internal.gameState, warning: null });
  }, [internal.gameState, setState]);

  const gameOverToLeaderboard = useCallback(() => {
    if (!internal.gameState) return;
    const score = calculateScore(internal.gameState);
    const goalNames: Record<string, string> = {
      'academic-excellence': 'Academic Excellence',
      'student-experience': 'Student Experience',
      'financial-stability': 'Financial Stability',
      'sustainable-campus': 'Sustainable Campus',
      'balanced-university': 'Balanced University',
    };
    const entry: LeaderboardEntry = {
      universityName: internal.gameState.universityName,
      yearsSurvived: internal.gameState.year,
      finalScore: score,
      mainAchievement: internal.gameState.won ? `${goalNames[internal.gameState.goal]} — Victory!` : `${internal.gameState.year} years operated`,
      goal: internal.gameState.goal,
      difficulty: internal.gameState.difficulty,
      date: new Date().toISOString(),
    };
    addToLeaderboard(entry);
    deleteSave();
    dispatch({ type: 'CLEAR_STATE' });
    setScreen('leaderboard');
  }, [internal.gameState, setScreen]);

  const value: GameContextType = {
    state: internal.gameState,
    screen: internal.screen,
    setScreen,
    startNewGame,
    continueGame,
    save,
    hasSavedGame: hasSave(),
    advanceOneMonth,
    advanceSemester,
    buildBuilding,
    upgradeBuilding,
    repairBuilding,
    hireFaculty,
    hireStaff,
    setTuition,
    fundResearch,
    buySustainability,
    resolveEvent,
    dismissSemesterReview,
    dismissYearlyReport,
    dismissWarning,
    gameOverToLeaderboard,
    leaderboard: getLeaderboard(),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
