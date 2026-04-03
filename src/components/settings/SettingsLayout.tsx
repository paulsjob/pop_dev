import { Tag, TagCategory } from '@/types/entities';
import { ApprovalRulesPanel } from './ApprovalRulesPanel';
import { GuardrailsPanel } from './GuardrailsPanel';
import { OutputTriggersPanel } from './OutputTriggersPanel';
import { ScoringPanel } from './ScoringPanel';
import { TagSystemPanel } from './TagSystemPanel';

interface SettingsLayoutProps {
  onBackToAnalyzer: () => void;
  tagCategories: TagCategory[];
  tags: Tag[];
}

export function SettingsLayout({ onBackToAnalyzer, tagCategories, tags }: SettingsLayoutProps) {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-slate-800">
      <section className="mx-auto w-full max-w-4xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">MD Editorial Engine</p>
            <h1 className="mt-1 text-3xl">Settings</h1>
          </div>
          <button onClick={onBackToAnalyzer} className="text-sm text-slate-500 hover:text-slate-700">
            Back to analyzer
          </button>
        </div>

        <GuardrailsPanel />
        <ScoringPanel />
        <TagSystemPanel categories={tagCategories} tags={tags} />
        <ApprovalRulesPanel />
        <OutputTriggersPanel />
      </section>
    </main>
  );
}
