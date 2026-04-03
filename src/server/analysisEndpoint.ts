import { callEditorialLLM, mapPromptOutputToStoryAnalysis } from '@/lib/analysisService';
import { AnalysisRequest, AnalysisResponse } from '@/types/editorialEngine';

/**
 * Server handler contract for POST /api/analysis.
 *
 * Prompt + guardrail source of truth:
 * - prompts/system_prompt.txt
 * - prompts/main_engine_prompt.txt
 * - prompts/guardrails_config.txt
 *
 * Keep these files on the server only; do not bundle prompt internals into client code.
 */
export async function handleAnalysisRequest(request: AnalysisRequest): Promise<AnalysisResponse> {
  const promptOutput = await callEditorialLLM(request);

  return {
    mode_used: 'live',
    analysis: mapPromptOutputToStoryAnalysis(promptOutput),
  };
}
