import { useGame } from '@/game/GameContext';
import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import { formatMoney } from '@/components/ui';
import type { LeaderboardEntry } from '@/game/types';

export function LeaderboardScreen() {
  const { setScreen, leaderboard } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-secondary-50/20 to-primary-50/10 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => setScreen('home')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-secondary-100 text-secondary-700 items-center justify-center mb-3">
            <Trophy size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Local Leaderboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Scores from this device only — not globally shared</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="card p-12 text-center">
            <Medal size={40} className="text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500">No scores yet. Play a game to get on the board!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry, i) => (
              <LeaderboardRow key={i} entry={entry} rank={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderboardRow({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const medalColors = ['bg-secondary-100 text-secondary-700', 'bg-neutral-200 text-neutral-600', 'bg-neutral-100 text-neutral-500'];
  const rankColor = rank <= 3 ? medalColors[rank - 1] : 'bg-neutral-100 text-neutral-500';

  return (
    <div className={`card p-4 flex items-center gap-4 ${rank === 1 ? 'border-secondary-300' : ''}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${rankColor}`}>
        {rank <= 3 ? <Medal size={20} /> : rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-neutral-800 truncate">{entry.universityName}</p>
        <p className="text-xs text-neutral-500">
          {entry.mainAchievement} · {entry.yearsSurvived} years · {entry.difficulty}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-lg font-bold text-primary-700">{entry.finalScore.toLocaleString()}</p>
        <p className="text-xs text-neutral-400">points</p>
      </div>
    </div>
  );
}
