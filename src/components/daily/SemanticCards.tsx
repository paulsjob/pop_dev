import { ReactNode } from 'react';
import { Gavel, Target, Users } from 'lucide-react';

interface SignalCardProps {
  title: string;
  confidence: number;
  icon: ReactNode;
}

type ActionTitle = 'Must Act' | 'Strong' | 'Test' | 'Monitor' | 'Pass';

interface ActionCardProps {
  title: ActionTitle;
  isSelected: boolean;
  isSystemPick: boolean;
}

type ImpactCategory = 'People Impact' | 'Political Stakes' | 'Audience Relevance';

interface ImpactPanelProps {
  category: ImpactCategory;
  description: string;
}

function getSignalStyles(confidence: number) {
  if (confidence >= 80) {
    return {
      container: 'border-2 border-emerald-500 bg-emerald-50',
      iconWrap: 'bg-emerald-100 text-emerald-800',
      title: 'text-emerald-900',
      confidence: 'text-emerald-950',
      progressTrack: 'bg-emerald-100',
      progressFill: 'bg-emerald-600',
    };
  }

  if (confidence >= 60) {
    return {
      container: 'border-2 border-amber-500 bg-amber-50',
      iconWrap: 'bg-amber-100 text-amber-800',
      title: 'text-amber-900',
      confidence: 'text-amber-950',
      progressTrack: 'bg-amber-100',
      progressFill: 'bg-amber-500',
    };
  }

  return {
    container: 'border border-slate-300 bg-slate-100',
    iconWrap: 'bg-slate-200 text-slate-600',
    title: 'text-slate-700',
    confidence: 'text-slate-700',
    progressTrack: 'bg-slate-200',
    progressFill: 'bg-slate-500',
  };
}

function getActionStyles(title: ActionTitle, isSelected: boolean) {
  if (!isSelected) {
    return {
      card: 'border border-slate-200 bg-white text-slate-500 shadow-none scale-100',
      label: 'text-slate-400',
    };
  }

  if (title === 'Pass') {
    return {
      card: 'border-2 border-red-800 bg-red-700 text-white shadow-[0_18px_38px_rgba(127,29,29,0.45)] scale-105',
      label: 'text-red-100',
    };
  }

  if (title === 'Monitor' || title === 'Test') {
    return {
      card: 'border-2 border-amber-700 bg-amber-400 text-amber-950 shadow-[0_18px_38px_rgba(180,83,9,0.35)] scale-105',
      label: 'text-amber-900/80',
    };
  }

  return {
    card: 'border-2 border-emerald-800 bg-emerald-700 text-white shadow-[0_18px_38px_rgba(6,78,59,0.42)] scale-105',
    label: 'text-emerald-100',
  };
}

export function SignalCard({ title, confidence, icon }: SignalCardProps) {
  const clampedConfidence = Math.max(0, Math.min(100, confidence));
  const styles = getSignalStyles(clampedConfidence);

  return (
    <article
      className={`rounded-2xl ${styles.container} p-4 transition-all duration-200`}
      aria-label={`${title} signal confidence ${Math.round(clampedConfidence)} percent`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}>
            {icon}
          </div>
          <h3 className={`truncate text-sm font-semibold ${styles.title}`}>{title}</h3>
        </div>
        <div className={`font-mono text-2xl font-bold leading-none ${styles.confidence}`}>{Math.round(clampedConfidence)}%</div>
      </div>
      <div className={`mt-4 h-2 w-full overflow-hidden rounded-full ${styles.progressTrack}`}>
        <div
          className={`h-full rounded-full ${styles.progressFill} transition-all duration-300`}
          style={{ width: `${clampedConfidence}%` }}
        />
      </div>
    </article>
  );
}

export function ActionCard({ title, isSelected, isSystemPick }: ActionCardProps) {
  const styles = getActionStyles(title, isSelected);

  return (
    <article
      className={`relative rounded-2xl p-5 transition-all duration-200 ${styles.card}`}
      aria-pressed={isSelected}
      data-selected={isSelected}
    >
      {isSystemPick && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-indigo-950 bg-indigo-500 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-white shadow-lg">
          SYSTEM PICK
        </div>
      )}
      <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${styles.label}`}>Recommended Action</p>
      <h3 className="mt-2 text-xl font-black tracking-tight">{title}</h3>
    </article>
  );
}

const categoryMeta: Record<
  ImpactCategory,
  { icon: typeof Users; title: string; accent: string }
> = {
  'People Impact': {
    icon: Users,
    title: 'People Impact',
    accent: 'text-sky-700 bg-sky-50 border-sky-200',
  },
  'Political Stakes': {
    icon: Gavel,
    title: 'Political Stakes',
    accent: 'text-violet-700 bg-violet-50 border-violet-200',
  },
  'Audience Relevance': {
    icon: Target,
    title: 'Audience Relevance',
    accent: 'text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200',
  },
};

export function ImpactPanel({ category, description }: ImpactPanelProps) {
  const meta = categoryMeta[category];
  const Icon = meta.icon;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <header className="mb-3 flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${meta.accent}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">{meta.title}</h3>
      </header>
      <p className="text-sm leading-6 text-slate-900">{description}</p>
    </section>
  );
}

export type { ActionCardProps, ActionTitle, ImpactCategory, ImpactPanelProps, SignalCardProps };
