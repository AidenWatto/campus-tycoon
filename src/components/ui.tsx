import type { ReactNode } from 'react';

// ============================================================
// METRIC BAR — visual indicator 0-100
// ============================================================

export function MetricBar({
  value,
  max = 100,
  label,
  color,
}: {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'accent' | 'warning' | 'error' | 'secondary' | 'success';
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const colorClass = color
    ? `bg-${color}-500`
    : pct >= 75
    ? 'bg-success-500'
    : pct >= 50
    ? 'bg-primary-500'
    : pct >= 30
    ? 'bg-warning-500'
    : 'bg-error-500';

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-neutral-500 w-24 shrink-0">{label}</span>}
      <div className="metric-bar flex-1">
        <div className={`metric-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-neutral-700 w-8 text-right">{Math.round(value)}</span>
    </div>
  );
}

// ============================================================
// STAT PILL — compact stat display
// ============================================================

export function StatPill({
  icon,
  label,
  value,
  color = 'neutral',
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  color?: 'primary' | 'accent' | 'warning' | 'error' | 'secondary' | 'neutral';
}) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-700',
    accent: 'bg-accent-50 text-accent-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    secondary: 'bg-secondary-50 text-secondary-700',
    neutral: 'bg-neutral-100 text-neutral-700',
  };
  return (
    <div className={`stat-pill ${colorMap[color]}`}>
      {icon}
      <span className="text-xs text-current opacity-70">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

// ============================================================
// MODAL — overlay dialog
// ============================================================

export function Modal({
  open,
  onClose,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in" onClick={onClose}>
      <div
        className={`${maxWidth} w-full bg-white rounded-2xl shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

export function EmptyState({ icon, message }: { icon?: ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
      {icon}
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
}

// ============================================================
// MONEY FORMAT
// ============================================================

export function formatMoney(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export function formatMoneyFull(n: number): string {
  return `$${n.toLocaleString()}`;
}
