import { useGame } from '@/game/GameContext';
import { formatMoneyFull } from '@/components/ui';
import { ArrowLeft, Building, ArrowUpCircle, Wrench, Users, DollarSign, FlaskConical, Leaf, AlertCircle, Calendar } from 'lucide-react';
import type { DecisionLogEntry } from '@/game/types';

const categoryIcons: Record<string, React.ReactNode> = {
  build: <Building size={14} />,
  upgrade: <ArrowUpCircle size={14} />,
  repair: <Wrench size={14} />,
  hire: <Users size={14} />,
  finance: <DollarSign size={14} />,
  policy: <DollarSign size={14} />,
  research: <FlaskConical size={14} />,
  sustainability: <Leaf size={14} />,
  event: <AlertCircle size={14} />,
  time: <Calendar size={14} />,
};

const categoryColors: Record<string, string> = {
  build: 'bg-primary-100 text-primary-700',
  upgrade: 'bg-primary-100 text-primary-700',
  repair: 'bg-warning-100 text-warning-700',
  hire: 'bg-accent-100 text-accent-700',
  finance: 'bg-secondary-100 text-secondary-700',
  policy: 'bg-secondary-100 text-secondary-700',
  research: 'bg-primary-100 text-primary-700',
  sustainability: 'bg-accent-100 text-accent-700',
  event: 'bg-warning-100 text-warning-700',
  time: 'bg-neutral-100 text-neutral-600',
};

export function DecisionLogScreen() {
  const { state, setScreen } = useGame();
  if (!state) return null;

  const sorted = [...state.decisionLog].reverse();

  return (
    <div className="min-h-screen bg-neutral-100 p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setScreen('game')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-4 transition-colors">
          <ArrowLeft size={18} /> Back to Game
        </button>

        <h1 className="text-2xl font-serif font-bold text-neutral-900 mb-1">Decision Log</h1>
        <p className="text-sm text-neutral-500 mb-6">{state.decisionLog.length} decisions recorded</p>

        {sorted.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-neutral-400">No decisions yet. Start managing your university!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((entry) => (
              <DecisionCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DecisionCard({ entry }: { entry: DecisionLogEntry }) {
  return (
    <div className="card p-3 flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${categoryColors[entry.category] || 'bg-neutral-100 text-neutral-600'}`}>
        {categoryIcons[entry.category] || <AlertCircle size={14} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-neutral-800">{entry.decision}</p>
          {entry.cost > 0 && (
            <span className="text-xs font-bold text-error-600 shrink-0">-{formatMoneyFull(entry.cost)}</span>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">{entry.outcome}</p>
        <p className="text-xs text-neutral-400 mt-1">
          Year {entry.year} — {entry.semester} — Month {entry.month}
        </p>
      </div>
    </div>
  );
}
