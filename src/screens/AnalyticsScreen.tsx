import { useGame } from '@/game/GameContext';
import { formatMoney } from '@/components/ui';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Star, Smile, BookOpen, Leaf, Wallet } from 'lucide-react';
import type { HistoryPoint } from '@/game/types';

export function AnalyticsScreen() {
  const { state, setScreen } = useGame();
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">No game data</p>
      </div>
    );
  }

  const history = state.history.length > 0 ? state.history : [{
    label: 'Start',
    budget: state.budget,
    students: state.students,
    reputation: state.reputation,
    satisfaction: state.satisfaction,
    academicQuality: state.academicQuality,
    sustainability: state.sustainability,
  }];

  return (
    <div className="min-h-screen bg-neutral-100 p-4 lg:p-6">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => setScreen('game')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-4 transition-colors">
          <ArrowLeft size={18} /> Back to Game
        </button>

        <h1 className="text-2xl font-serif font-bold text-neutral-900 mb-1">Campus Analytics</h1>
        <p className="text-sm text-neutral-500 mb-6">{state.universityName} — Year {state.year}</p>

        {/* Financial Overview */}
        <div className="card p-5 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Financial</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard icon={<Wallet size={16} />} label="Current Budget" value={formatMoney(state.budget)} color="primary" />
            <StatCard icon={<TrendingUp size={16} />} label="Monthly Income" value={formatMoney(state.monthlyIncome)} color="success" />
            <StatCard icon={<TrendingDown size={16} />} label="Monthly Expenses" value={formatMoney(state.monthlyExpenses)} color="error" />
            <StatCard icon={<Wallet size={16} />} label="Net Cash Flow" value={`${state.monthlyIncome - state.monthlyExpenses >= 0 ? '+' : ''}${formatMoney(state.monthlyIncome - state.monthlyExpenses)}`} color={state.monthlyIncome - state.monthlyExpenses >= 0 ? 'success' : 'error'} />
          </div>
          <Chart history={history} metric="budget" label="Budget Over Time" color="#3366ff" formatFn={formatMoney} />
        </div>

        {/* Students */}
        <div className="card p-5 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Students</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard icon={<Users size={16} />} label="Enrollment" value={state.students.toString()} color="primary" />
            <StatCard icon={<Smile size={16} />} label="Satisfaction" value={`${state.satisfaction}/100`} color="accent" />
            <StatCard icon={<Users size={16} />} label="Capacity" value={state.studentCapacity.toString()} color="neutral" />
            <StatCard icon={<Users size={16} />} label="Utilization" value={`${Math.round((state.students / state.studentCapacity) * 100)}%`} color="secondary" />
          </div>
          <Chart history={history} metric="students" label="Enrollment Over Time" color="#1bb565" />
        </div>

        {/* Academics */}
        <div className="card p-5 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Academics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard icon={<BookOpen size={16} />} label="Academic Quality" value={`${state.academicQuality}/100`} color="primary" />
            <StatCard icon={<Star size={16} />} label="Reputation" value={`${state.reputation}/100`} color="secondary" />
            <StatCard icon={<Users size={16} />} label="Total Faculty" value={(state.faculty.faculty + state.faculty.seniorFaculty + state.faculty.researchStaff).toString()} color="neutral" />
            <StatCard icon={<Leaf size={16} />} label="Sustainability" value={`${state.sustainability}/100`} color="accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Chart history={history} metric="reputation" label="Reputation" color="#e89423" />
            <Chart history={history} metric="academicQuality" label="Academic Quality" color="#3366ff" />
          </div>
        </div>

        {/* Campus */}
        <div className="card p-5 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-4">Campus</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={<Users size={16} />} label="Total Buildings" value={state.buildings.length.toString()} color="neutral" />
            <StatCard icon={<Users size={16} />} label="Completed" value={state.buildings.filter(b => b.completed).length.toString()} color="success" />
            <StatCard icon={<Users size={16} />} label="Under Construction" value={state.buildings.filter(b => !b.completed).length.toString()} color="warning" />
            <StatCard icon={<Leaf size={16} />} label="Sustainability" value={`${state.sustainability}/100`} color="accent" />
          </div>
          <div className="mt-4">
            <Chart history={history} metric="sustainability" label="Sustainability Over Time" color="#1bb565" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'primary' | 'accent' | 'warning' | 'error' | 'secondary' | 'neutral' | 'success' }) {
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
    <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
      <div className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${colorMap[color]} mb-1.5`}>
        {icon}
      </div>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-base font-bold text-neutral-800">{value}</p>
    </div>
  );
}

// ============================================================
// SIMPLE SVG CHART
// ============================================================

function Chart({
  history,
  metric,
  label,
  color,
  formatFn,
}: {
  history: HistoryPoint[];
  metric: keyof HistoryPoint;
  label: string;
  color: string;
  formatFn?: (n: number) => string;
}) {
  const points = history.map((h) => h[metric] as number);
  if (points.length === 0) return null;

  const width = 400;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 20, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  const xStep = points.length > 1 ? chartW / (points.length - 1) : 0;
  const yScale = (v: number) => chartH - ((v - min) / range) * chartH + padding.top;

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + i * xStep} ${yScale(p)}`)
    .join(' ');

  const areaPath = points.length > 0
    ? `${pathData} L ${padding.left + (points.length - 1) * xStep} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`
    : '';

  return (
    <div>
      <p className="text-xs font-medium text-neutral-500 mb-1">{label}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: '140px' }}>
        <path d={areaPath} fill={color} opacity={0.1} />
        <path d={pathData} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={padding.left + i * xStep}
            cy={yScale(p)}
            r={2.5}
            fill={color}
          />
        ))}
        {/* Y-axis labels */}
        <text x={padding.left - 5} y={padding.top + 5} textAnchor="end" className="text-[8px] fill-neutral-400">
          {formatFn ? formatFn(max) : Math.round(max)}
        </text>
        <text x={padding.left - 5} y={padding.top + chartH} textAnchor="end" className="text-[8px] fill-neutral-400">
          {formatFn ? formatFn(min) : Math.round(min)}
        </text>
        {/* X-axis labels */}
        {history.map((h, i) => (
          i % Math.max(1, Math.floor(history.length / 5)) === 0 ? (
            <text key={i} x={padding.left + i * xStep} y={height - 5} textAnchor="middle" className="text-[8px] fill-neutral-400">
              {h.label}
            </text>
          ) : null
        ))}
      </svg>
    </div>
  );
}
