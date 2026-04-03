# MD Editorial Engine MVP (Local)

Internal leadership console prototype for story intake, structured analysis review, tag editing, evidence review, and final editorial decision logging.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- Supabase JS client (`@supabase/supabase-js`)

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env
   ```
3. Add env vars in `.env` (if using Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Start local dev server:
   ```bash
   npm run dev
   ```

## Supabase behavior
- If `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are set, the app attempts live reads/writes.
- If they are absent, the app runs in local mock mode for analysis, evidence, and tags.

## MVP tables targeted
The data layer is intentionally pragmatic for MVP and expects these tables:
- `organizations`
- `profiles`
- `organization_members`
- `stories`
- `story_sources`
- `story_analysis_runs`
- `tag_categories`
- `tags`
- `story_tags`
- `story_decisions`
- `evidence_items`
- `output_recommendations`

Only key paths are wired in this first version (story creation, primary story source creation, tags load/save, decision save, evidence load).

## Current workflow
- Intake panel: paste URL/text first, then optional assistive metadata.
- Analyze Story: creates story/source and runs mocked analysis.
- Decision panel: edit tags, decision metadata, and save.
- Analysis/evidence/output recommendations are visible in the center/right columns.

## Prompting Codex to generate `package.json`
Use this prompt when you want Codex to scaffold or refresh the Node manifest based on the current codebase:

```text
Generate a standard package.json file for this Node.js project. Include any dependencies required by the code written so far, and include common scripts for development, build, test, and lint when applicable.
```

Tip: run this from the repository root so Codex can inspect imports and choose the right dependencies.
