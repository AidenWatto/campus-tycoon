import { useGame } from '@/game/GameContext';
import { Modal, formatMoney } from '@/components/ui';
import { calculateScore } from '@/game/engine';
import { GOAL_DEFS } from '@/game/data';
import {
  AlertTriangle, Sparkles, TrendingUp, TrendingDown, Users, DollarSign,
  CheckCircle2, XCircle, Trophy, AlertCircle, ChevronRight,
} from 'lucide-react';
import type { GameState, GameEvent } from '@/game/types';

// ============================================================
// EVENT MODAL
// ============================================================

export function EventModal({ event }: { event: GameEvent | null }) {
  const { resolveEvent } = useGame();
  if (!event) return null;

  const categoryIcons: Record<string, React.ReactNode> = {
    opportunity: <Sparkles size={20} className="text-secondary-500" />,
    crisis: <AlertTriangle size={20} className="text-error-500" />,
    student: <Users size={20} className="text-accent-500" />,
    financial: <DollarSign size={20} className="text-primary-500" />,
    academic: <TrendingUp size={20} className="text-primary-500" />,
  };

  return (
    <Modal open={!!event} maxWidth="max-w-md">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {categoryIcons[event.category]}
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{event.category}</span>
        </div>
        <h3 className="text-lg font-bold text-neutral-800 mb-2">{event.title}</h3>
        <p className="text-sm text-neutral-600 mb-5 leading-relaxed">{event.description}</p>
        <div className="space-y-2">
          {event.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => resolveEvent(i)}
              className="w-full text-left p-4 rounded-lg border border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200 group"
            >
              <p className="font-semibold text-sm text-neutral-800 mb-1">{choice.label}</p>
              <p className="text-xs text-neutral-500">{choice.description}</p>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// ============================================================
// SEMESTER REVIEW MODAL
// ============================================================

export function SemesterReviewModal({ state }: { state: GameState }) {
  const { dismissSemesterReview } = useGame();
  if (!state.semesterReview) return null;
  const review = state.semesterReview;

  return (
    <Modal open={!!state.semesterReview} onClose={dismissSemesterReview} maxWidth="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-bold text-neutral-800 mb-1">Semester Review</h3>
        <p className="text-sm text-neutral-500 mb-4">Year {review.year} — {review.semester} Semester</p>

        <div className="space-y-2 mb-4">
          <ReviewRow label="Student Satisfaction" change={review.satisfactionChange} />
          <ReviewRow label="Academic Quality" change={review.academicChange} />
          <ReviewRow label="Reputation" change={review.reputationChange} />
          <ReviewRow label="Enrollment" change={review.enrollmentChange} suffix="students" />
          <div className="h-px bg-neutral-200 my-2" />
          <ReviewRow label="Revenue" change={review.revenue} isMoney positive />
          <ReviewRow label="Expenses" change={review.expenses} isMoney negative />
        </div>

        <p className="text-sm text-neutral-600 bg-neutral-50 rounded-lg p-3 mb-4">{review.summary}</p>

        <button onClick={dismissSemesterReview} className="btn-primary w-full">
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </Modal>
  );
}

function ReviewRow({
  label, change, isMoney, positive, negative, suffix,
}: {
  label: string;
  change: number;
  isMoney?: boolean;
  positive?: boolean;
  negative?: boolean;
  suffix?: string;
}) {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const color = positive ? (isPositive ? 'text-success-600' : 'text-error-600')
    : negative ? (isPositive ? 'text-error-600' : 'text-success-600')
    : isPositive ? 'text-success-600' : isNegative ? 'text-error-600' : 'text-neutral-500';

  const formatted = isMoney ? formatMoney(Math.abs(change)) : Math.abs(change).toString();
  const sign = change > 0 ? '+' : change < 0 ? '-' : '';

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className={`font-bold ${color}`}>
        {sign}{formatted}{suffix ? ` ${suffix}` : ''}
      </span>
    </div>
  );
}

// ============================================================
// YEARLY REPORT MODAL
// ============================================================

export function YearlyReportModal({ state }: { state: GameState }) {
  const { dismissYearlyReport } = useGame();
  if (!state.yearlyReport) return null;
  const report = state.yearlyReport;

  return (
    <Modal open={!!state.yearlyReport} onClose={dismissYearlyReport} maxWidth="max-w-lg">
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="inline-flex w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 items-center justify-center mb-2">
            <Trophy size={24} />
          </div>
          <h3 className="text-xl font-bold text-neutral-800">Year {report.year} Review</h3>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <MetricBox label="Students" value={report.students.toString()} />
          <MetricBox label="Satisfaction" value={`${report.satisfaction}`} />
          <MetricBox label="Academic" value={`${report.academicQuality}`} />
          <MetricBox label="Reputation" value={`${report.reputation}`} />
          <MetricBox label="Budget" value={formatMoney(report.budget)} />
          <MetricBox label="Sustainability" value={`${report.sustainability}`} />
        </div>

        {/* What went well */}
        {report.whatWentWell.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-success-600 uppercase tracking-wider mb-1.5">What Went Well</p>
            <ul className="space-y-1">
              {report.whatWentWell.map((item, i) => (
                <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-success-500 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas to improve */}
        {report.areasToImprove.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-warning-600 uppercase tracking-wider mb-1.5">Areas to Improve</p>
            <ul className="space-y-1">
              {report.areasToImprove.map((item, i) => (
                <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                  <AlertCircle size={14} className="text-warning-500 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Major decisions */}
        {report.majorDecisions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Major Decisions</p>
            <ul className="space-y-0.5">
              {report.majorDecisions.map((item, i) => (
                <li key={i} className="text-xs text-neutral-500 flex items-start gap-2">
                  <ChevronRight size={12} className="mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Financial summary */}
        <div className="bg-neutral-50 rounded-lg p-3 mb-3">
          <p className="text-xs text-neutral-600">{report.financialSummary}</p>
        </div>

        {/* Next year outlook */}
        <div className="bg-primary-50 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-1">Next Year Outlook</p>
          <p className="text-sm text-neutral-600">{report.nextYearOutlook}</p>
        </div>

        <button onClick={dismissYearlyReport} className="btn-primary w-full">
          Begin Year {report.year + 1} <ChevronRight size={16} />
        </button>
      </div>
    </Modal>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-neutral-50 rounded-lg p-2.5 text-center">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-base font-bold text-neutral-800">{value}</p>
    </div>
  );
}

// ============================================================
// WARNING BANNER
// ============================================================

export function WarningBanner({ state }: { state: GameState }) {
  const { dismissWarning } = useGame();
  if (!state.warning) return null;

  return (
    <div className="bg-warning-50 border-l-4 border-warning-500 px-4 py-3 flex items-center justify-between animate-slide-down">
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} className="text-warning-600 shrink-0" />
        <p className="text-sm text-warning-800">{state.warning}</p>
      </div>
      <button onClick={dismissWarning} className="text-xs text-warning-600 hover:text-warning-800 font-medium shrink-0 ml-3">
        Dismiss
      </button>
    </div>
  );
}

// ============================================================
// GAME OVER MODAL
// ============================================================

export function GameOverModal({ state }: { state: GameState }) {
  const { gameOverToLeaderboard } = useGame();
  if (!state.gameOver && !state.won) return null;

  const score = calculateScore(state);
  const goalDef = GOAL_DEFS[state.goal];

  return (
    <Modal open={state.gameOver || state.won} maxWidth="max-w-md">
      <div className="p-6 text-center">
        {state.won ? (
          <>
            <div className="inline-flex w-16 h-16 rounded-2xl bg-success-100 text-success-600 items-center justify-center mb-4">
              <Trophy size={32} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 mb-1">Victory!</h3>
            <p className="text-sm text-neutral-500 mb-4">
              {state.universityName} achieved {goalDef.name} in Year {state.year}!
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex w-16 h-16 rounded-2xl bg-error-100 text-error-600 items-center justify-center mb-4">
              <XCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 mb-1">Game Over</h3>
            <p className="text-sm text-neutral-500 mb-4">{state.gameOverReason}</p>
          </>
        )}

        <div className="bg-neutral-50 rounded-lg p-4 mb-4">
          <p className="text-xs text-neutral-500 mb-1">Final Score</p>
          <p className="text-3xl font-bold text-primary-700">{score.toLocaleString()}</p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div><span className="text-neutral-500">Years:</span> <span className="font-bold">{state.year}</span></div>
            <div><span className="text-neutral-500">Students:</span> <span className="font-bold">{state.students}</span></div>
            <div><span className="text-neutral-500">Reputation:</span> <span className="font-bold">{state.reputation}</span></div>
            <div><span className="text-neutral-500">Satisfaction:</span> <span className="font-bold">{state.satisfaction}</span></div>
          </div>
        </div>

        <button onClick={gameOverToLeaderboard} className="btn-primary w-full">
          Submit to Leaderboard <ChevronRight size={16} />
        </button>
      </div>
    </Modal>
  );
}
