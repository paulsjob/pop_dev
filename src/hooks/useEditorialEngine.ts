import { useEffect, useMemo, useState } from 'react';
import {
  createStory,
  createStorySource,
  loadEvidence,
  loadTags,
  runAnalysis,
  saveStoryDecision,
  saveStoryTags,
} from '@/lib/data';
import { EvidenceItem, StoryAnalysis, StoryDecision, Tag, TagCategory, Urgency } from '@/types/entities';
import { AnalysisMode } from '@/types/editorialEngine';

interface IntakeFormState {
  pasted_input: string;
  source_type: string;
  source_name: string;
  title: string;
  raw_text: string;
  urgency: Urgency;
  submission_notes: string;
}

interface IntakeHints {
  detectedType: 'url' | 'text' | 'transcript' | null;
  detectedSourceName?: string;
  detectedTitle?: string;
  appliedFields: string[];
}

const initialIntake: IntakeFormState = {
  pasted_input: '',
  source_type: 'url',
  source_name: '',
  title: '',
  raw_text: '',
  urgency: 'medium',
  submission_notes: '',
};

const initialHints: IntakeHints = {
  detectedType: null,
  appliedFields: [],
};

const defaultAnalysisMode = (import.meta.env.VITE_ANALYSIS_MODE as AnalysisMode | undefined) ?? 'auto';


function titleFromHostname(hostname: string) {
  return hostname
    .replace(/^www\./, '')
    .split('.')
    .slice(0, -1)
    .join(' ')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function detectTitleFromText(input: string) {
  const sourceLine = input
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /^(title|headline)\s*:/i.test(line));

  if (sourceLine) {
    return sourceLine.split(':').slice(1).join(':').trim();
  }

  const markdownHeading = input
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /^#{1,2}\s+/.test(line));

  if (markdownHeading) {
    return markdownHeading.replace(/^#{1,2}\s+/, '').trim();
  }

  return undefined;
}

function deriveMagicFields(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      detectedType: null,
      detectedSourceName: undefined,
      detectedTitle: undefined,
      suggestedRawText: undefined,
    };
  }

  const urlMatch = trimmed.match(/https?:\/\/[^\s]+/i);
  if (urlMatch) {
    try {
      const parsed = new URL(urlMatch[0]);
      return {
        detectedType: 'url' as const,
        detectedSourceName: titleFromHostname(parsed.hostname),
        detectedTitle: detectTitleFromText(trimmed),
        suggestedRawText: trimmed.length > urlMatch[0].length + 30 ? trimmed : undefined,
      };
    } catch {
      // fall through to text detection
    }
  }

  const isTranscript = /\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(trimmed) && /\n/.test(trimmed);
  return {
    detectedType: isTranscript ? ('transcript' as const) : ('text' as const),
    detectedSourceName: undefined,
    detectedTitle: detectTitleFromText(trimmed),
    suggestedRawText: trimmed,
  };
}

export function useEditorialEngine() {
  const [intake, setIntake] = useState<IntakeFormState>(initialIntake);
  const [intakeHints, setIntakeHints] = useState<IntakeHints>(initialHints);
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [categories, setCategories] = useState<TagCategory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>('Ready. Paste a story URL or raw text to begin.');

  const [decision, setDecision] = useState<StoryDecision>({
    story_id: '',
    decision: 'review',
    workflow_status: 'analysis_ready',
    priority: 'normal',
    owner: '',
    leader_notes: '',
  });

  useEffect(() => {
    loadTags()
      .then(({ categories: cat, tags: t }) => {
        setCategories(cat);
        setTags(t);
      })
      .catch(() => setMessage('Could not load tags from Supabase. Using local defaults.'));
  }, []);

  const groupedTags = useMemo(
    () =>
      categories.map((category) => ({
        category,
        tags: tags.filter((tag) => tag.category_id === category.id),
      })),
    [categories, tags],
  );

  function applyPastedInputMagic(input: string) {
    const detected = deriveMagicFields(input);
    if (!detected.detectedType) {
      setIntakeHints(initialHints);
      return;
    }

    const appliedFields: string[] = [];
    setIntake((prev) => {
      const next = { ...prev };

      if (prev.source_type !== detected.detectedType) {
        next.source_type = detected.detectedType;
        appliedFields.push('source type');
      }

      if (!prev.source_name && detected.detectedSourceName) {
        next.source_name = detected.detectedSourceName;
        appliedFields.push('source name');
      }

      if (!prev.title && detected.detectedTitle) {
        next.title = detected.detectedTitle;
        appliedFields.push('title');
      }

      if (!prev.raw_text && detected.suggestedRawText && detected.detectedType !== 'url') {
        next.raw_text = detected.suggestedRawText;
        appliedFields.push('raw text');
      }

      return next;
    });

    setIntakeHints({
      detectedType: detected.detectedType,
      detectedSourceName: detected.detectedSourceName,
      detectedTitle: detected.detectedTitle,
      appliedFields,
    });
  }

  function patchIntake(key: keyof IntakeFormState, value: string) {
    setIntake((prev) => ({
      ...prev,
      [key]: key === 'urgency' ? (value as Urgency) : value,
    }));

    if (key === 'pasted_input') {
      applyPastedInputMagic(value);
    }
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
  }

  function clearTagsByCategory(categoryId: string) {
    const categoryTagIds = tags.filter((tag) => tag.category_id === categoryId).map((tag) => tag.id);
    setSelectedTags((prev) => prev.filter((tagId) => !categoryTagIds.includes(tagId)));
  }

  function triggerPop(key: string) {
    setMessage(`Mock POP trigger fired for ${key}.`);
  }

  async function saveDraft() {
    setSaving(true);
    try {
      const story = await createStory({
        title: intake.title || 'Untitled Draft',
        raw_text: intake.raw_text || intake.pasted_input,
        source_name: intake.source_name,
        urgency: intake.urgency,
        notes: intake.submission_notes,
      });

      setStoryId(story.id);
      setDecision((prev) => ({ ...prev, story_id: story.id }));
      setMessage('Draft saved. You can now run analysis.');
    } catch {
      setMessage('Failed to save draft. Check Supabase setup or keep using local mode.');
    } finally {
      setSaving(false);
    }
  }

  async function analyzeStory() {
    setSaving(true);
    try {
      let activeStoryId = storyId;
      if (!activeStoryId) {
        const story = await createStory({
          title: intake.title || 'Untitled Story',
          raw_text: intake.raw_text || intake.pasted_input,
          source_name: intake.source_name,
          urgency: intake.urgency,
          notes: intake.submission_notes,
        });
        activeStoryId = story.id;
        setStoryId(story.id);
        setDecision((prev) => ({ ...prev, story_id: story.id }));
      }

      await createStorySource({
        story_id: activeStoryId,
        source_type: intake.source_type,
        source_name: intake.source_name,
        url: intake.source_type === 'url' ? intake.pasted_input : null,
        raw_text: intake.raw_text || intake.pasted_input,
      });

      const [result, evidenceItems] = await Promise.all([
        runAnalysis({
          story_id: activeStoryId,
          mode: defaultAnalysisMode,
          input: {
            title: intake.title || 'Untitled Story',
            raw_text: intake.raw_text || intake.pasted_input,
            source_type: intake.source_type,
            source_name: intake.source_name || undefined,
            urgency: intake.urgency,
            submission_notes: intake.submission_notes || undefined,
          },
        }),
        loadEvidence(activeStoryId),
      ]);
      setAnalysis(result);
      setEvidence(evidenceItems);
      setMessage('Analysis completed. Review results and finalize decision.');
    } catch {
      setMessage('Analysis failed. Verify required fields and Supabase connectivity.');
    } finally {
      setSaving(false);
    }
  }

  async function saveDecision() {
    if (!storyId) {
      setMessage('Save or analyze a story first.');
      return;
    }

    setSaving(true);
    try {
      await Promise.all([saveStoryDecision({ ...decision, story_id: storyId }), saveStoryTags(storyId, selectedTags)]);
      setMessage('Decision and tags saved.');
    } catch {
      setMessage('Could not save decision/tags. Using local-only mode if Supabase is unavailable.');
    } finally {
      setSaving(false);
    }
  }

  return {
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
    storyId,
    triggerPop,
  };
}
