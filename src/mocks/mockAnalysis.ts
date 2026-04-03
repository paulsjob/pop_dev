import { EvidenceItem, StoryAnalysis, Tag, TagCategory } from '@/types/entities';

export const mockAnalysis: StoryAnalysis = {
  short_summary: 'City council advances emergency zoning change tied to new shelter rollout.',
  long_summary:
    'Leadership debate is centered on cost, neighborhood impact, and timing. Regional partners support expansion while local stakeholders demand stricter oversight and milestone reporting.',
  why_it_matters:
    'This can reset how urban service investments are framed before budget hearings next month.',
  practical: 'Immediate implementation details affect service continuity and staffing plans.',
  political: 'Competing narratives are forming between fiscal restraint and public health urgency.',
  audience: 'Civic leaders, policy reporters, local voters, and advocacy groups.',
  key_entities: ['City Council', 'Mayor Office', 'Public Health Department', 'Neighborhood Coalition'],
  recommended_angles: [
    'Follow the money: what shifts in the next quarter budget?',
    'Who gains faster access to services and who is left waiting?',
    'How does this compare with peer cities outcomes?',
  ],
  final_recommendation: 'Proceed with a balanced explainer plus accountability tracker coverage.',
  editorial_scores: {
    urgency: 8,
    clarity: 7,
    resonance: 8,
    emotional_charge: 6,
    youtube_potential: 6,
    social_potential: 8,
    strategic_fit: 9,
    overall_score: 8,
  },
  recommended_outputs: [
    { output_type: 'Policy Explainer', confidence: 0.84, trigger_key: 'pop_policy_explainer' },
    { output_type: 'Leadership Brief', confidence: 0.78, trigger_key: 'pop_internal_brief' },
  ],
};

export const mockEvidence: EvidenceItem[] = [
  {
    id: 'ev-1',
    title: 'Budget appendix line item change',
    excerpt: 'Proposed adjustment increases emergency services allocation by 14% in Q3.',
    source_url: 'https://example.org/budget-appendix',
  },
  {
    id: 'ev-2',
    title: 'Council hearing transcript',
    excerpt: 'Two swing votes requested measurable impact reports every 30 days.',
    source_url: 'https://example.org/hearing-transcript',
  },
];

export const mockTagCategories: TagCategory[] = [
  { id: 'cat-1', name: 'Topic' },
  { id: 'cat-2', name: 'Audience' },
  { id: 'cat-3', name: 'Risk' },
];

export const mockTags: Tag[] = [
  { id: 'tag-1', category_id: 'cat-1', label: 'Housing' },
  { id: 'tag-2', category_id: 'cat-1', label: 'Public Policy' },
  { id: 'tag-3', category_id: 'cat-2', label: 'Civic Leaders' },
  { id: 'tag-4', category_id: 'cat-2', label: 'General Public' },
  { id: 'tag-5', category_id: 'cat-3', label: 'Reputational' },
  { id: 'tag-6', category_id: 'cat-3', label: 'Operational' },
];
