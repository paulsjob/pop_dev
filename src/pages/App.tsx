import { useEffect, useMemo, useState } from 'react';
import { StoryInputScreen } from '@/components/daily/StoryInputScreen';
import { ProcessingScreen } from '@/components/daily/ProcessingScreen';
import { ResultsScreen } from '@/components/daily/ResultsScreen';
import { ExtractionReviewScreen } from '@/components/daily/ExtractionReviewScreen';
import { SettingsLayout } from '@/components/settings/SettingsLayout';
import { loadEvidence, loadTags, runAnalysis, createStory, createStorySource, saveStoryDecision } from '@/lib/data';
import { mockEvidence } from '@/mocks/mockAnalysis';
import { EvidenceItem, StoryAnalysis, Tag, TagCategory } from '@/types/entities';

const processingStages = [
  'Detecting source',
  'Extracting content',
  'Reviewing evidence',
  'Scoring story',
  'Generating recommendation',
  'Suggesting outputs',
];

type RouteMode = 'daily' | 'settings';
type FlowState = 'input' | 'correction' | 'processing' | 'results';

interface InferredStoryInput {
  sourceType: string;
  sourceName: string;
  headline: string;
  rawText: string;
  url: string | null;
  confidence: number;
}

function getRouteMode(): RouteMode {
  return window.location.pathname.startsWith('/settings') ? 'settings' : 'daily';
}

function normalizeSourceName(hostname: string) {
  const base = hostname.replace(/^www\./i, '').split('.').filter(Boolean)[0] ?? hostname;
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function detectSourceType(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 'text';
  if (/https?:\/\//i.test(trimmed)) return 'url';
  if (/\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(trimmed)) return 'transcript';
  if (/^subject:/im.test(trimmed)) return 'email';
  if (trimmed.length < 220) return 'summary';
  return 'article';
}

function inferHeadline(text: string) {
  const heading = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /^#{1,2}\s+/.test(line));

  if (heading) return heading.replace(/^#{1,2}\s+/, '').trim();

  const first = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 24);

  return first?.slice(0, 88) ?? 'Untitled Story';
}

function inferStoryInput(text: string): InferredStoryInput {
  const trimmed = text.trim();
  const sourceType = detectSourceType(trimmed);
  const urlMatch = trimmed.match(/https?:\/\/[^\s]+/i);
  const url = urlMatch?.[0] ?? null;

  let sourceName = sourceType === 'url' ? 'External Source' : 'Pasted Input';

  if (url) {
    try {
      const hostname = new URL(url).hostname;
      sourceName = normalizeSourceName(hostname) || 'External Source';
    } catch {
      sourceName = 'External Source';
    }
  } else if (/^subject:/im.test(trimmed)) {
    sourceName = 'Email Submission';
  } else if (sourceType === 'transcript') {
    sourceName = 'Transcript Input';
  }

  const headline = inferHeadline(trimmed);

  let confidence = 0.45;
  if (url) confidence += 0.35;
  if (trimmed.length > 300) confidence += 0.2;
  if (/^#{1,2}\s+/m.test(trimmed) || /[.!?]\s/.test(trimmed)) confidence += 0.12;
  if (trimmed.length < 60) confidence -= 0.25;
  if (headline === 'Untitled Story') confidence -= 0.15;

  return {
    sourceType,
    sourceName,
    headline,
    rawText: trimmed,
    url,
    confidence: Math.max(0, Math.min(confidence, 0.99)),
  };
}

export function App() {
  const [route, setRoute] = useState<RouteMode>(getRouteMode);
  const [flow, setFlow] = useState<FlowState>('input');
  const [pastedInput, setPastedInput] = useState('');
  const [processingIndex, setProcessingIndex] = useState(0);
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(mockEvidence);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [pendingInference, setPendingInference] = useState<InferredStoryInput | null>(null);
  const [finalInference, setFinalInference] = useState<InferredStoryInput | null>(null);

  useEffect(() => {
    const onPop = () => setRoute(getRouteMode());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    loadTags()
      .then((response) => {
        setTags(response.tags);
        setTagCategories(response.categories);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (flow !== 'processing') return;

    setProcessingIndex(0);
    const timer = window.setInterval(() => {
      setProcessingIndex((prev) => (prev + 1 >= processingStages.length ? prev : prev + 1));
    }, 700);

    return () => window.clearInterval(timer);
  }, [flow]);

  const sourceType = useMemo(() => detectSourceType(pastedInput), [pastedInput]);

  const suggestedTags = useMemo(() => {
    const entityTags = analysis?.key_entities?.slice(0, 5) ?? [];
    const canonical = tags.slice(0, 4).map((tag) => tag.label);
    return Array.from(new Set([...canonical, ...entityTags]));
  }, [analysis?.key_entities, tags]);

  function navigateTo(mode: RouteMode) {
    const nextPath = mode === 'settings' ? '/settings' : '/';
    window.history.pushState({}, '', nextPath);
    setRoute(mode);
  }

  async function runStoryAnalysis(inferred: InferredStoryInput) {
    setFlow('processing');
    setFinalInference(inferred);

    try {
      const story = await createStory({
        title: inferred.headline,
        raw_text: inferred.rawText,
        source_name: inferred.sourceName,
        urgency: 'medium',
        notes: 'Generated from single-input analyzer flow.',
      });

      setStoryId(story.id);

      await createStorySource({
        story_id: story.id,
        source_type: inferred.sourceType,
        source_name: inferred.sourceName,
        url: inferred.url,
        raw_text: inferred.rawText,
      });

      const [analysisResult, evidenceResult] = await Promise.all([
        runAnalysis({
          story_id: story.id,
          mode: 'auto',
          input: {
            title: inferred.headline,
            raw_text: inferred.rawText,
            source_type: inferred.sourceType,
            source_name: inferred.sourceName,
            urgency: 'medium',
          },
        }),
        loadEvidence(story.id),
      ]);

      setAnalysis(analysisResult);
      setEvidence(evidenceResult.length ? evidenceResult : mockEvidence);
      setProcessingIndex(processingStages.length - 1);
      setFlow('results');
    } catch {
      setFinalInference(null);
      setFlow('input');
    }
  }

  async function handleAnalyzeStory() {
    if (!pastedInput.trim()) return;

    const inferred = inferStoryInput(pastedInput);

    if (inferred.confidence < 0.72) {
      setPendingInference(inferred);
      setFlow('correction');
      return;
    }

    await runStoryAnalysis(inferred);
  }

  async function handleDecision(action: 'approve' | 'edit' | 'pass') {
    if (!storyId) return;

    await saveStoryDecision({
      story_id: storyId,
      decision: action,
      workflow_status: action === 'approve' ? 'approved' : action === 'pass' ? 'passed' : 'editing',
      priority: analysis?.editorial_scores.overall_score && analysis.editorial_scores.overall_score > 7 ? 'high' : 'normal',
      owner: 'Editorial Desk',
      leader_notes: `${action.toUpperCase()} via one-screen results workflow`,
    });
  }

  if (route === 'settings') {
    return (
      <SettingsLayout
        tagCategories={tagCategories}
        tags={tags}
        onBackToAnalyzer={() => navigateTo('daily')}
      />
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 text-stone-800">
      {flow === 'input' && (
        <StoryInputScreen
          value={pastedInput}
          onChange={setPastedInput}
          onAnalyze={handleAnalyzeStory}
          onOpenSettings={() => navigateTo('settings')}
        />
      )}

      {flow === 'correction' && pendingInference && (
        <ExtractionReviewScreen
          inference={pendingInference}
          onBack={() => {
            setFlow('input');
            setPendingInference(null);
          }}
          onUpdate={(next) => setPendingInference(next)}
          onContinue={async () => {
            await runStoryAnalysis(pendingInference);
            setPendingInference(null);
          }}
        />
      )}

      {flow === 'processing' && (
        <ProcessingScreen
          steps={processingStages}
          activeStepIndex={processingIndex}
        />
      )}

      {flow === 'results' && analysis && (
        <ResultsScreen
          sourceType={finalInference?.sourceType ?? sourceType}
          headline={finalInference?.headline ?? inferHeadline(pastedInput)}
          analysis={analysis}
          suggestedTags={suggestedTags}
          evidence={evidence}
          onApprove={() => handleDecision('approve')}
          onEdit={() => handleDecision('edit')}
          onPass={() => handleDecision('pass')}
          onGeneratePop={() => undefined}
          onAnalyzeAnother={() => {
            setAnalysis(null);
            setFlow('input');
            setPastedInput('');
            setStoryId(null);
            setPendingInference(null);
            setFinalInference(null);
          }}
        />
      )}
    </main>
  );
}
