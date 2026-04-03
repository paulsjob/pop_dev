import { AppShell } from '@/components/AppShell';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { DecisionPanel } from '@/components/DecisionPanel';
import { IntakePanel } from '@/components/IntakePanel';
import { mockAnalysis } from '@/mocks/mockAnalysis';
import { useEditorialEngine } from '@/hooks/useEditorialEngine';

export function App() {
  const {
    intake,
    intakeHints,
    patchIntake,
    saveDraft,
    analyzeStory,
    analysis,
    groupedTags,
    selectedTags,
    toggleTag,
    clearTagsByCategory,
    decision,
    setDecision,
    saveDecision,
    evidence,
    message,
    saving,
    triggerPop,
  } = useEditorialEngine();

  return (
    <AppShell
      status={message}
      left={
        <IntakePanel
          values={intake}
          hints={intakeHints}
          disabled={saving}
          onChange={patchIntake}
          onAnalyze={analyzeStory}
          onSaveDraft={saveDraft}
        />
      }
      center={<AnalysisPanel analysis={analysis} onTriggerPop={triggerPop} />}
      right={
        <DecisionPanel
          decision={decision}
          onDecisionChange={setDecision}
          onSave={saveDecision}
          disabled={saving}
          tagGroups={groupedTags}
          selectedTagIds={selectedTags}
          onTagToggle={toggleTag}
          onClearCategory={clearTagsByCategory}
          evidence={evidence}
          outputs={analysis?.recommended_outputs ?? mockAnalysis.recommended_outputs}
          onTriggerPop={triggerPop}
        />
      }
    />
  );
}
