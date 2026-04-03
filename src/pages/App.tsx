import { AppShell } from '@/components/AppShell';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { DecisionPanel } from '@/components/DecisionPanel';
import { IntakePanel } from '@/components/IntakePanel';
import { mockAnalysis } from '@/mocks/mockAnalysis';
import { useEditorialEngine } from '@/hooks/useEditorialEngine';

export function App() {
  const {
    intake,
    patchIntake,
    saveDraft,
    analyzeStory,
    analysis,
    groupedTags,
    selectedTags,
    toggleTag,
    decision,
    setDecision,
    saveDecision,
    evidence,
    message,
    saving,
  } = useEditorialEngine();

  return (
    <AppShell
      status={message}
      left={
        <IntakePanel
          values={intake}
          disabled={saving}
          onChange={patchIntake}
          onAnalyze={analyzeStory}
          onSaveDraft={saveDraft}
        />
      }
      center={<AnalysisPanel analysis={analysis} />}
      right={
        <DecisionPanel
          decision={decision}
          onDecisionChange={setDecision}
          onSave={saveDecision}
          disabled={saving}
          tagGroups={groupedTags}
          selectedTagIds={selectedTags}
          onTagToggle={toggleTag}
          evidence={evidence}
          outputs={analysis?.recommended_outputs ?? mockAnalysis.recommended_outputs}
        />
      }
    />
  );
}
