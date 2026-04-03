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

interface IntakeFormState {
  pasted_input: string;
  source_type: string;
  source_name: string;
  title: string;
  raw_text: string;
  urgency: Urgency;
  submission_notes: string;
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

export function useEditorialEngine() {
  const [intake, setIntake] = useState<IntakeFormState>(initialIntake);
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

  function patchIntake(key: keyof IntakeFormState, value: string) {
    setIntake((prev) => ({
      ...prev,
      [key]: key === 'urgency' ? (value as Urgency) : value,
    }));
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
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

      const [result, evidenceItems] = await Promise.all([runAnalysis(activeStoryId), loadEvidence(activeStoryId)]);
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
      await Promise.all([
        saveStoryDecision({ ...decision, story_id: storyId }),
        saveStoryTags(storyId, selectedTags),
      ]);
      setMessage('Decision and tags saved.');
    } catch {
      setMessage('Could not save decision/tags. Using local-only mode if Supabase is unavailable.');
    } finally {
      setSaving(false);
    }
  }

  return {
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
    storyId,
  };
}
