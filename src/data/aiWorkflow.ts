import type { AiWorkflow } from '../types';

export const aiWorkflow: AiWorkflow = {
  title: 'How I guide coding agents',
  introduction:
    'I started learning AI in early March 2025. I use Codex and ChatGPT for research, and coding agents for scoped audits, phased refactoring, performance work, and debugging. Clear constraints and human review keep the work focused and verifiable.',
  steps: [
    {
      title: 'Understand first',
      description:
        'Inspect the existing behavior, find the responsible code, and define a focused scope before changing it.',
    },
    {
      title: 'Make it reviewable',
      description:
        'Give agents project conventions and phased prompts. Use approval gates for structural changes and migrations.',
    },
    {
      title: 'Verify the result',
      description:
        'Review the changes, check affected call sites, and validate types, builds, and browser behavior.',
    },
  ],
  tools: [
    'Cursor',
    'Claude Code',
    'Codex',
    'ChatGPT',
    'AI-assisted research',
    'Structured prompts',
    'Audit-first workflows',
  ],
};
