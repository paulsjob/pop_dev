export type Urgency = 'low' | 'medium' | 'high' | 'critical';

export interface Story {
  id: string;
  organization_id?: string | null;
  title: string;
  raw_text: string;
  source_name?: string | null;
  urgency: Urgency;
  notes?: string | null;
  created_at?: string;
}

export interface StorySource {
  id: string;
  story_id: string;
  source_type: string;
  url?: string | null;
  source_name?: string | null;
  raw_text: string;
}

export interface EditorialScores {
  urgency: number;
  clarity: number;
  resonance: number;
  emotional_charge: number;
  youtube_potential: number;
  social_potential: number;
  strategic_fit: number;
  overall_score: number;
}

export interface OutputRecommendation {
  id?: string;
  output_type: string;
  confidence: number;
  trigger_key: string;
  notes?: string;
}

export interface StoryAnalysis {
  short_summary: string;
  long_summary: string;
  why_it_matters: string;
  practical: string;
  political: string;
  audience: string;
  key_entities: string[];
  recommended_angles: string[];
  final_recommendation: string;
  editorial_scores: EditorialScores;
  recommended_outputs: OutputRecommendation[];
}

export interface TagCategory {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  category_id: string;
  label: string;
}

export interface StoryDecision {
  story_id: string;
  decision: string;
  workflow_status: string;
  priority: string;
  owner: string;
  leader_notes: string;
}

export interface EvidenceItem {
  id: string;
  story_id?: string;
  title: string;
  excerpt: string;
  source_url?: string;
}
