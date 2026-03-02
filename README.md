# laravel-vue-skills

## Installation

Use [skills](https://www.npmjs.com/package/skills) for universal installation:

```
npx skills add noartem/skills
```

_Optional_. Install vue skills from [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills):

```
npx skills add onmax/nuxt-skills # reka-ui, vite, vue, vueuse
```

## Compatibility

- Laravel: targeting Laravel 11/12 conventions with PHP 8.1+.
- Vue: Vue 3 + Vite + TypeScript baseline.
- Tailwind CSS: v3+ utility-first workflows.
- shadcn-vue: designed around the official docs and CLI guidance for Vue 3.

If you are on older versions, adjust component API usage, directory conventions, and Tailwind configuration accordingly.

## Repository Structure

- `agents/`: Subagent markdown definitions.
- `skills/`: Skill markdown definitions with frontmatter and Sources sections.
- `scripts/`: Doc generation and validation scripts.

## Sources

This repository is a clean-room framework inspired by the sources below. No code was directly vendored unless explicitly stated. Licenses were not verified in this environment; update the license fields after confirming upstream LICENSE/NOTICE files.

### Laravel skills & agents

- [JustSteveKing/laravel-api-skill](https://github.com/JustSteveKing/laravel-api-skill)
- [laravel/claude-code](https://github.com/laravel/claude-code)
- [jpcaparas/superpowers-laravel](https://github.com/jpcaparas/superpowers-laravel)
- [obra/superpowers](https://github.com/obra/superpowers)

### Frontend skills

- [ibelick/ui-skills](https://github.com/ibelick/ui-skills)
- [secondsky/claude-skills](https://github.com/secondsky/claude-skills/tree/main/plugins/shadcn-vue)

### Official specifications

- https://agentskills.io/
- https://www.shadcn-vue.com/docs/
