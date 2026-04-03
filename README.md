# POP Editorial Prompt Architecture

This repository contains a production-ready 3-layer prompt architecture for structured political editorial analysis.

## Components
- `prompts/system_prompt.txt`: static identity and behavior contract.
- `prompts/guardrails_config.txt`: dynamic guardrails injection template.
- `prompts/main_engine_prompt.txt`: core task prompt for editorial evaluation.
- `prompts/evidence_extraction_prompt.txt`: separate evidence extraction pass.
- `prompts/tag_normalization_prompt.txt`: optional tag cleanup pass.
- `schemas/editorial_output.schema.json`: strict JSON schema for editorial outputs.
- `schemas/evidence_output.schema.json`: strict JSON schema for evidence outputs.

## Recommended Pipeline
1. User submits story input.
2. Run main engine prompt and validate against editorial schema.
3. Run evidence extraction prompt and validate against evidence schema.
4. Optionally run tag normalization.
5. Persist outputs for retrieval and automation.
