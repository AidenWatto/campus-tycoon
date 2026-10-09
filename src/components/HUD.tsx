import { useGame } from '@/game/GameContext';
import { formatMoney } from '@/components/ui';
import {
  GraduationCap, Users, Star, Smile, BookOpen, Leaf,
  Wallet, TrendingUp, TrendingDown, Calendar, Save, Home, BarChart3, ScrollText,
} from 'lucide-react';
import type { GameState } from '@/game/types';

export function HUD({ state }: { state: GameState }) {
  const { setScreen, save } = useGame();

  const monthlyNet = state.monthlyIncome - state.monthlyExpenses;
  const semesterLabel = state.semester === 'Summer' ? 'Summer' : state.semester;

  return (
    <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      {/* Top row: university info + nav */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 border-b border-neutral-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
            <GraduationCap size={20} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-neutral-800 truncate">{state.universityName}</p>
            <p className="text-xs text-neutral-500">
              Year {state.year} — {semesterLabel} Semester
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={save} className="btn-ghost px-2.5 py-2" title="Save Game">
            <Save size={16} />
          </button>
          <button onClick={() => setScreen('analytics')} className="btn-ghost px-2.5 py-2" title="Analytics">
            <BarChart3 size={16} />
          </button>
          <button onClick={() => setScreen('decision-log')} className="btn-ghost px-2.5 py-2" title="Decision Log">
            <ScrollText size={16} />
          </button>
          <button onClick={() => setScreen('home')} className="btn-ghost px-2.5 py-2" title="Home">
            <Home size={16} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 px-4 lg:px-6 py-2.5 overflow-x-auto scrollbar-thin">
        <StatChip icon={<Wallet size={14} />} label="Budget" value={formatMoney(state.budget)} color="primary" />
        <StatChip icon={<TrendingUp size={14} />} label="Income" value={`${formatMoney(state.monthlyIncome)}/mo`} color="success" />
        <StatChip icon={<TrendingDown size={14} />} label="Expenses" value={`${formatMoney(state.monthlyExpenses)}/mo`} color="error" />
        <StatChip icon={<Users size={14} />} label="Students" value={`${state.students}/${state.studentCapacity}`} color="neutral" />
        <StatChip icon={<Star size={14} />} label="Reputation" value={`${state.reputation}/100`} color="secondary" />
        <StatChip icon={<Smile size={14} />} label="Satisfaction" value={`${state.satisfaction}/100`} color="accent" />
        <StatChip icon={<BookOpen size={14} />} label="Academic" value={`${state.academicQuality}/100`} color="primary" />
        <StatChip icon={<Leaf size={14} />} label="Sustainability" value={`${state.sustainability}/100`} color="accent" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
          <Calendar size={14} />
          <span className="text-xs font-medium">
            {monthName(state.month)} Y{state.year}
          </span>
          {monthlyNet < 0 && (
            <span className="text-xs font-bold text-error-600 ml-1">-{formatMoney(Math.abs(monthlyNet))}/mo</span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatChip({
  icon, label, value, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'primary' | 'accent' | 'warning' | 'error' | 'secondary' | 'neutral' | 'success';
}) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-700',
    accent: 'bg-accent-50 text-accent-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    secondary: 'bg-secondary-50 text-secondary-700',
    neutral: 'bg-neutral-100 text-neutral-700',
    success: 'bg-success-50 text-success-700',
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${colorMap[color]} shrink-0`}>
      {icon}
      <span className="text-xs opacity-70">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );
}

function monthName(m: number): string {
  const names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return names[m] || '';
}
