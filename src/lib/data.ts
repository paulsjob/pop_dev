import { mockEvidence, mockTagCategories, mockTags } from '@/mocks/mockAnalysis';
import {
  EvidenceItem,
  Story,
  StoryAnalysis,
  StoryDecision,
  StorySource,
  Tag,
  TagCategory,
} from '@/types/entities';
import { AnalysisRequest } from '@/types/editorialEngine';
import { requestAnalysis } from './analysisService';
import { hasSupabaseConfig, supabase } from './supabase';

export async function createStory(payload: Omit<Story, 'id'>): Promise<Story> {
  if (!hasSupabaseConfig || !supabase) {
    return { ...payload, id: crypto.randomUUID() };
  }

  const { data, error } = await supabase.from('stories').insert(payload).select().single();
  if (error) throw error;
  return data as Story;
}

export async function createStorySource(payload: Omit<StorySource, 'id'>): Promise<StorySource> {
  if (!hasSupabaseConfig || !supabase) {
    return { ...payload, id: crypto.randomUUID() };
  }

  const { data, error } = await supabase.from('story_sources').insert(payload).select().single();
  if (error) throw error;
  return data as StorySource;
}

export async function loadTags(): Promise<{ categories: TagCategory[]; tags: Tag[] }> {
  if (!hasSupabaseConfig || !supabase) {
    return { categories: mockTagCategories, tags: mockTags };
  }

  const [{ data: categories, error: catError }, { data: tags, error: tagError }] = await Promise.all([
    supabase.from('tag_categories').select('*').order('name'),
    supabase.from('tags').select('*').order('label'),
  ]);

  if (catError || tagError) throw catError ?? tagError;

  return { categories: (categories ?? []) as TagCategory[], tags: (tags ?? []) as Tag[] };
}

export async function runAnalysis(payload: AnalysisRequest): Promise<StoryAnalysis> {
  const result = await requestAnalysis(payload);
  return result.analysis;
}

export async function saveStoryDecision(payload: StoryDecision): Promise<StoryDecision> {
  if (!hasSupabaseConfig || !supabase) {
    return payload;
  }

  const { data, error } = await supabase.from('story_decisions').upsert(payload).select().single();
  if (error) throw error;
  return data as StoryDecision;
}

export async function saveStoryTags(storyId: string, tagIds: string[]): Promise<void> {
  if (!hasSupabaseConfig || !supabase) return;

  await supabase.from('story_tags').delete().eq('story_id', storyId);

  if (!tagIds.length) return;

  const payload = tagIds.map((tagId) => ({ story_id: storyId, tag_id: tagId }));
  const { error } = await supabase.from('story_tags').insert(payload);
  if (error) throw error;
}

export async function loadEvidence(storyId?: string): Promise<EvidenceItem[]> {
  if (!hasSupabaseConfig || !supabase || !storyId) {
    return mockEvidence;
  }

  const { data, error } = await supabase.from('evidence_items').select('*').eq('story_id', storyId);
  if (error) throw error;

  return (data as EvidenceItem[])?.length ? (data as EvidenceItem[]) : mockEvidence;
}
