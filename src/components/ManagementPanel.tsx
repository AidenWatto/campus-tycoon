import { useState } from 'react';
import { useGame } from '@/game/GameContext';
import { RESEARCH_COSTS, GOAL_DEFS } from '@/game/data';
import { formatMoneyFull, formatMoney } from '@/components/ui';
import {
  Users, Wrench, Headphones, Briefcase, GraduationCap, FlaskConical,
  DollarSign, Leaf, Sun, Lightbulb, Recycle, Bike, CloudRain, Trees,
  ChevronRight, Check, AlertTriangle,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { GameState } from '@/game/types';

type Tab = 'staff' | 'finance' | 'research' | 'sustainability';

export function ManagementPanel() {
  const [tab, setTab] = useState<Tab>('staff');
  const { state } = useGame();
  if (!state) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'staff', label: 'Staff', icon: <Users size={16} /> },
    { key: 'finance', label: 'Finance', icon: <DollarSign size={16} /> },
    { key: 'research', label: 'Research', icon: <FlaskConical size={16} /> },
    { key: 'sustainability', label: 'Green', icon: <Leaf size={16} /> },
  ];

  return (
    <div className="card overflow-hidden">
      <div className="flex border-b border-neutral-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary-500 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4">
        {tab === 'staff' && <StaffTab state={state} />}
        {tab === 'finance' && <FinanceTab state={state} />}
        {tab === 'research' && <ResearchTab state={state} />}
        {tab === 'sustainability' && <SustainabilityTab state={state} />}
      </div>
    </div>
  );
}

// ============================================================
// STAFF TAB
// ============================================================

function StaffTab({ state }: { state: GameState }) {
  const { hireFaculty, hireStaff } = useGame();

  const totalFaculty = state.faculty.faculty + state.faculty.seniorFaculty + state.faculty.researchStaff;
  const ratio = totalFaculty > 0 ? (state.students / totalFaculty).toFixed(1) : '—';

  const hireOptions = [
    { type: 'faculty' as const, label: 'Faculty Member', icon: <GraduationCap size={18} />, salary: 6000, count: state.faculty.faculty, action: () => hireFaculty('faculty') },
    { type: 'seniorFaculty' as const, label: 'Senior Faculty', icon: <Briefcase size={18} />, salary: 9000, count: state.faculty.seniorFaculty, action: () => hireFaculty('seniorFaculty') },
    { type: 'researchStaff' as const, label: 'Research Staff', icon: <FlaskConical size={18} />, salary: 7500, count: state.faculty.researchStaff, action: () => hireFaculty('researchStaff') },
    { type: 'administrators' as const, label: 'Administrator', icon: <Users size={18} />, salary: 5500, count: state.faculty.administrators, action: () => hireStaff('administrators') },
    { type: 'maintenance' as const, label: 'Maintenance Worker', icon: <Wrench size={18} />, salary: 4500, count: state.faculty.maintenance, action: () => hireStaff('maintenance') },
    { type: 'studentSupport' as const, label: 'Student Support', icon: <Headphones size={18} />, salary: 4800, count: state.faculty.studentSupport, action: () => hireStaff('studentSupport') },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-neutral-500">Student-Faculty Ratio: <span className="font-bold text-neutral-800">{ratio}:1</span></span>
        <span className="text-neutral-500">Total Staff: <span className="font-bold text-neutral-800">{state.staff}</span></span>
      </div>
      <div className="space-y-2">
        {hireOptions.map((opt) => {
          const hireCost = opt.salary * 2;
          const canAfford = state.budget >= hireCost;
          return (
            <div key={opt.type} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-600">
                  {opt.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{opt.label}</p>
                  <p className="text-xs text-neutral-500">
                    {opt.count} employed · {formatMoneyFull(opt.salary)}/mo · Hire: {formatMoneyFull(hireCost)}
                  </p>
                </div>
              </div>
              <button
                onClick={opt.action}
                disabled={!canAfford}
                className="btn-primary py-1.5 px-3 text-xs"
              >
                Hire
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// FINANCE TAB
// ============================================================

function FinanceTab({ state }: { state: GameState }) {
  const { setTuition } = useGame();
  const [tuition, setTuitionState] = useState(state.tuition);

  const monthlyNet = state.monthlyIncome - state.monthlyExpenses;
  const projectedYearly = monthlyNet * 12;
  const tuitionRevenue = (state.students * state.tuition) / 12;

  const presets = [8000, 10000, 12000, 14000, 16000, 18000, 20000];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <FinanceBox label="Monthly Income" value={formatMoney(state.monthlyIncome)} color="text-success-600" />
        <FinanceBox label="Monthly Expenses" value={formatMoney(state.monthlyExpenses)} color="text-error-600" />
        <FinanceBox label="Net Cash Flow" value={`${monthlyNet >= 0 ? '+' : ''}${formatMoney(monthlyNet)}/mo`} color={monthlyNet >= 0 ? 'text-success-600' : 'text-error-600'} />
        <FinanceBox label="Projected Yearly" value={`${projectedYearly >= 0 ? '+' : ''}${formatMoney(projectedYearly)}`} color={projectedYearly >= 0 ? 'text-success-600' : 'text-error-600'} />
      </div>

      <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
        <p className="text-xs font-semibold text-neutral-600 mb-2">Income Breakdown</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between"><span className="text-neutral-500">Tuition</span><span className="font-medium">{formatMoney(tuitionRevenue)}/mo</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Housing</span><span className="font-medium">{formatMoney((Math.min(state.students, state.housingCapacity) * 4000) / 12)}/mo</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Grants & Donations</span><span className="font-medium">{formatMoney(state.monthlyIncome - tuitionRevenue - (Math.min(state.students, state.housingCapacity) * 4000) / 12)}/mo</span></div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-neutral-600">Tuition Setting</p>
          <p className="text-sm font-bold text-primary-700">{formatMoneyFull(tuition)}/year</p>
        </div>
        <input
          type="range"
          min={4000}
          max={25000}
          step={500}
          value={tuition}
          onChange={(e) => setTuitionState(Number(e.target.value))}
          className="w-full accent-primary-600"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => { setTuitionState(p); setTuition(p); }}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                tuition === p ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {formatMoney(p)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setTuition(tuition)}
          disabled={tuition === state.tuition}
          className="btn-primary w-full mt-3 py-2 text-xs"
        >
          Apply Tuition Change
        </button>
        {tuition !== state.tuition && (
          <p className="text-xs text-neutral-400 mt-1.5 text-center">
            {tuition > state.tuition ? 'Higher tuition may reduce satisfaction' : 'Lower tuition may boost satisfaction'}
          </p>
        )}
      </div>
    </div>
  );
}

function FinanceBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-neutral-50 rounded-lg p-2.5 border border-neutral-200">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}

// ============================================================
// RESEARCH TAB
// ============================================================

function ResearchTab({ state }: { state: GameState }) {
  const { fundResearch } = useGame();

  return (
    <div>
      <p className="text-xs text-neutral-500 mb-3">
        Funding research improves academic quality and reputation. Each level costs more but provides greater benefits.
      </p>
      <div className="space-y-2">
        {state.research.map((area) => {
          const maxLevel = RESEARCH_COSTS.length;
          const nextCost = area.level < maxLevel ? RESEARCH_COSTS[area.level] : null;
          const canAfford = nextCost !== null && state.budget >= nextCost;
          return (
            <div key={area.id} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-neutral-800">{area.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: maxLevel }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-4 rounded-sm ${i < area.level ? 'bg-primary-500' : 'bg-neutral-200'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">
                  Level {area.level}/{maxLevel}
                  {area.investment > 0 && ` · ${formatMoney(area.investment)} invested`}
                </p>
                {nextCost !== null ? (
                  <button
                    onClick={() => fundResearch(area.id)}
                    disabled={!canAfford}
                    className="btn-primary py-1.5 px-3 text-xs"
                  >
                    Fund ({formatMoneyFull(nextCost)})
                  </button>
                ) : (
                  <span className="text-xs text-success-600 font-medium flex items-center gap-1">
                    <Check size={14} /> Maxed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// SUSTAINABILITY TAB
// ============================================================

function SustainabilityTab({ state }: { state: GameState }) {
  const { buySustainability } = useGame();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-neutral-500">Current Sustainability: <span className="font-bold text-accent-700">{state.sustainability}/100</span></p>
      </div>
      <div className="space-y-2">
        {state.sustainabilityUpgrades.map((upgrade) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[upgrade.iconName] || Leaf;
          const canAfford = state.budget >= upgrade.cost;
          return (
            <div
              key={upgrade.id}
              className={`p-3 rounded-lg border transition-all ${
                upgrade.purchased
                  ? 'bg-accent-50 border-accent-200'
                  : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  upgrade.purchased ? 'bg-accent-500 text-white' : 'bg-white border border-neutral-200 text-neutral-600'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800">{upgrade.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{upgrade.description}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    <span className="text-accent-600 font-medium">+{upgrade.sustainabilityBoost} sustainability</span>
                    {upgrade.maintenanceReduction > 0 && (
                      <span className="text-success-600">-{formatMoney(upgrade.maintenanceReduction)}/mo maint.</span>
                    )}
                  </div>
                </div>
                {upgrade.purchased ? (
                  <span className="text-xs text-accent-600 font-medium flex items-center gap-1 shrink-0">
                    <Check size={14} /> Installed
                  </span>
                ) : (
                  <button
                    onClick={() => buySustainability(upgrade.id)}
                    disabled={!canAfford}
                    className="btn-accent py-1.5 px-3 text-xs shrink-0"
                  >
                    {formatMoneyFull(upgrade.cost)}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// SATISFACTION FACTORS PANEL
// ============================================================

export function SatisfactionFactorsPanel({ state }: { state: GameState }) {
  const positive = state.satisfactionFactors.filter((f) => f.value > 0);
  const negative = state.satisfactionFactors.filter((f) => f.value < 0);

  return (
    <div className="card p-4">
      <h3 className="text-sm font-bold text-neutral-700 mb-3">Satisfaction Factors</h3>
      <div className="space-y-1.5">
        {positive.map((f, i) => (
          <div key={`pos-${i}`} className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">{f.label}</span>
            <span className="font-bold text-success-600">+{f.value}</span>
          </div>
        ))}
        {negative.map((f, i) => (
          <div key={`neg-${i}`} className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">{f.label}</span>
            <span className="font-bold text-error-600">{f.value}</span>
          </div>
        ))}
        {state.satisfactionFactors.length === 0 && (
          <p className="text-xs text-neutral-400">No significant factors</p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// GOAL PROGRESS PANEL
// ============================================================

export function GoalProgressPanel({ state }: { state: GameState }) {
  const goalDef = GOAL_DEFS[state.goal];
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[goalDef.icon] || Icons.Target;

  let progress = 0;
  let progressLabel = '';
  switch (state.goal) {
    case 'academic-excellence':
      progress = (state.academicQuality / 90) * 100;
      progressLabel = `${state.academicQuality}/90`;
      break;
    case 'student-experience':
      progress = (state.satisfaction / 90) * 100;
      progressLabel = `${state.satisfaction}/90`;
      break;
    case 'financial-stability':
      progress = (state.consecutivePositiveCashFlow / 60) * 100;
      progressLabel = `${state.consecutivePositiveCashFlow}/60 months`;
      break;
    case 'sustainable-campus':
      progress = (state.sustainability / 90) * 100;
      progressLabel = `${state.sustainability}/90`;
      break;
    case 'balanced-university':
      progress = Math.min(
        state.reputation, state.satisfaction, state.academicQuality, state.sustainability
      ) / 75 * 100;
      progressLabel = `${Math.min(state.reputation, state.satisfaction, state.academicQuality, state.sustainability)}/75`;
      break;
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center">
          <Icon size={16} />
        </div>
        <div>
          <p className="text-xs text-neutral-500">Goal</p>
          <p className="text-sm font-bold text-neutral-800">{goalDef.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-secondary-500 transition-all duration-500"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <span className="text-xs font-bold text-neutral-700">{progressLabel}</span>
      </div>
    </div>
  );
}
