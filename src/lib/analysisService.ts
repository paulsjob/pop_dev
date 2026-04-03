import { mockAnalysis } from '@/mocks/mockAnalysis';
import { StoryAnalysis } from '@/types/entities';
import { AnalysisMode, AnalysisRequest, AnalysisResponse, EditorialEnginePromptOutput } from '@/types/editorialEngine';

const DEFAULT_ANALYSIS_ENDPOINT = '/api/analysis';

function resolveAnalysisMode(requestMode?: AnalysisMode): AnalysisMode {
  if (requestMode) return requestMode;

  const envMode = import.meta.env.VITE_ANALYSIS_MODE as AnalysisMode | undefined;
  if (envMode === 'mock' || envMode === 'live' || envMode === 'auto') {
    return envMode;
  }

  return 'auto';
}

function mapPromptOutputToStoryAnalysis(output: EditorialEnginePromptOutput): StoryAnalysis {
  return {
    short_summary: output.summary_short ?? '',
    long_summary: output.summary_long ?? '',
    why_it_matters: [output.why_it_matters.practical, output.why_it_matters.political, output.why_it_matters.audience]
      .filter(Boolean)
      .join(' '),
    practical: output.why_it_matters.practical ?? '',
    political: output.why_it_matters.political ?? '',
    audience: output.why_it_matters.audience ?? '',
    key_entities: output.key_entities,
    recommended_angles: output.recommended_angles,
    final_recommendation: output.final_recommendation,
    editorial_scores: output.editorial_scores,
    recommended_outputs: output.recommended_outputs.map((outputRecommendation) => ({
      output_type: outputRecommendation.type,
      confidence:
        outputRecommendation.confidence > 1
          ? Math.min(outputRecommendation.confidence / 100, 1)
          : outputRecommendation.confidence,
      trigger_key: outputRecommendation.trigger,
    })),
  };
}

/**
 * Placeholder LLM invoker for future live-mode support.
 *
 * Implement this in a secure server runtime (not client-side) so API keys stay private.
 */
export async function callEditorialLLM(_request: AnalysisRequest): Promise<EditorialEnginePromptOutput> {
  throw new Error('LLM provider is not configured yet.');
}

async function requestLiveAnalysis(request: AnalysisRequest): Promise<StoryAnalysis> {
  const response = await fetch(DEFAULT_ANALYSIS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Analysis endpoint returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as AnalysisResponse;
  return payload.analysis;
}

export async function requestAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
  const mode = resolveAnalysisMode(request.mode);

  if (mode === 'mock') {
    return { mode_used: 'mock', analysis: mockAnalysis };
  }

  try {
    const analysis = await requestLiveAnalysis(request);
    return { mode_used: 'live', analysis };
  } catch {
    if (mode === 'live') throw new Error('Live analysis requested but endpoint is unavailable.');
    return { mode_used: 'mock', analysis: mockAnalysis };
  }
}

export { mapPromptOutputToStoryAnalysis };
