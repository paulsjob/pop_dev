import { StoryAnalysis, Urgency } from '@/types/entities';

export type AnalysisMode = 'mock' | 'live' | 'auto';

export interface EditorialEnginePromptInput {
  title: string;
  raw_text: string;
  source_type: string;
  source_name?: string;
  urgency: Urgency;
  submission_notes?: string;
}

export interface EditorialEnginePromptOutput {
  summary_short: string | null;
  summary_long: string | null;
  why_it_matters: {
    practical: string | null;
    political: string | null;
    audience: string | null;
  };
  key_entities: string[];
  topic_tags: string[];
  audience_tags: string[];
  format_tags: string[];
  narrative_tags: string[];
  time_tags: string[];
  geography_tags: string[];
  cluster_tags: string[];
  editorial_scores: {
    urgency: number;
    clarity: number;
    resonance: number;
    emotional_charge: number;
    youtube_potential: number;
    social_potential: number;
    strategic_fit: number;
    overall_score: number;
  };
  recommended_angles: string[];
  recommended_outputs: Array<{
    type: string;
    confidence: number;
    trigger: string;
  }>;
  risks: string[];
  final_recommendation: 'must-act' | 'strong' | 'test' | 'monitor' | 'pass';
}

export interface AnalysisRequest {
  story_id: string;
  mode?: AnalysisMode;
  input: EditorialEnginePromptInput;
}

export interface AnalysisResponse {
  mode_used: 'mock' | 'live';
  analysis: StoryAnalysis;
}
