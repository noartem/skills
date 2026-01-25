---
name: shadcn-vue
description: shadcn-vue for Vue/Nuxt with Reka UI components and Tailwind. Use for accessible UI, Auto Form, data tables, charts, dark mode, MCP server setup, or encountering component imports, Reka UI errors.
---

# shadcn-vue Production Stack

**Production-tested**: Vue/Nuxt applications with accessible, customizable components
**Status**: Production Ready ✅
**Latest Version**: shadcn-vue@latest (Reka UI v2)
**Dependencies**: Tailwind CSS, Reka UI, Vue 3+ or Nuxt 3+

---

## Quick Start (3 Minutes)

### For Vue Projects (Vite)

#### 1. Initialize shadcn-vue

```bash
npx shadcn-vue@latest init
```

**During initialization**:

- Style: `New York` or `Default` (cannot change later!)
- Base color: `Slate` (recommended)
- CSS variables: `Yes` (required for dark mode)

#### 2. Configure TypeScript Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 3. Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite"; // Tailwind v4
import path from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

#### 4. Add Your First Component

```bash
npx shadcn-vue@latest add button
```

---

## Quick Reference

| Need                    | Command or file                                    |
| ----------------------- | -------------------------------------------------- |
| Initialize project      | `npx shadcn-vue@latest init`                       |
| Add component           | `npx shadcn-vue@latest add button`                 |
| Add multiple components | `npx shadcn-vue@latest add button card dialog`     |
| Build registry JSON     | `npx shadcn-vue@latest build`                      |
| Generate component docs | `npx tsx scripts/generate-shadcn-components.ts`    |
| Enable CSS variables    | `components.json` → `tailwind.cssVariables: true`  |
| Add registry namespace  | `components.json` → `registries` map               |
| Opencode MCP init       | `npx shadcn-vue@latest mcp init --client opencode` |
| Codex MCP config        | `~/.codex/config.toml` with `mcp_servers.shadcn`   |

---

## Component Library (50+ Components)

### Navigation & Layout

- Accordion, Alert Dialog, Avatar, Badge, Breadcrumb, Card, Carousel, Collapsible, Dialog, Drawer, Dropdown Menu, Menu Bar, Navigation Menu, Pagination, Popover, Resizable, Scroll Area, Sheet, Sidebar, Tabs, Toast, Tooltip

### Form Components

- Auto Form, Button, Calendar, Checkbox, Combobox, Command, Context Menu, Date Picker, Form, Input, Input OTP, Label, Number Field, PIN Input, Radio Group, Range Calendar, Select, Slider, Sonner, Switch, Textarea, Toggle, Toggle Group

### Data Display

- Aspect Ratio, Data Table, Skeleton, Stepper, Splitter, Table, Tag Input

### Advanced

- Charts (Unovis), Color Picker, Editable, File Upload, Sortable

**Full Component Reference**: Use MCP server or visit https://shadcn-vue.com/docs/components

---

## Auto Form - Schema-Based Forms

### Installation

```bash
npx shadcn-vue@latest add auto-form

npm install zod
```

### Basic Usage

```vue
<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18 or older"),
  bio: z.string().optional(),
  subscribe: z.boolean().default(false),
});

function onSubmit(values: z.infer<typeof schema>) {
  console.log("Form submitted:", values);
}
</script>

<template>
  <AutoForm :schema="schema" @submit="onSubmit">
    <template #submit>
      <Button type="submit">Submit</Button>
    </template>
  </AutoForm>
</template>
```

**Supported Field Types**: string, number, boolean, date, enum, array, object

---

## Data Tables with TanStack Table

### Installation

```bash
npx shadcn-vue@latest add data-table

npm install @tanstack/vue-table
```

### Basic Setup

```vue
<script setup lang="ts">
import { DataTable } from "@/components/ui/data-table";
import { h } from "vue";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];
</script>

<template>
  <DataTable :columns="columns" :data="data" />
</template>
```

**Features**: Sorting, filtering, pagination, row selection, column visibility, expandable rows

---

## Dark Mode Implementation

### Installation

```bash
npm install @vueuse/core
```

### Setup Theme Provider

```vue
<!-- components/ThemeProvider.vue -->
<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();
</script>

<template>
  <div :class="mode">
    <slot />
  </div>
</template>
```

### Use in Components

```vue
<script setup>
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();

function toggleTheme() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <Button @click="toggleTheme">
    {{ mode === "dark" ? "🌙" : "☀️" }}
  </Button>
</template>
```

---

## MCP Server Setup

Shadcn-vue provides an MCP server for AI-driven component browsing and installation.

### Initialize MCP

```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add button dialog card
npx shadcn-vue@latest mcp init --client opencode
```

### Opencode Configuration

Ensure `opencode.json` enables the server:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "shadcnVue": {
      "type": "local",
      "enabled": true,
      "command": ["npx", "shadcn-vue@latest", "mcp"]
    }
  }
}
```

Restart opencode and try:

- Show me all available components in the shadcn registry
- Add the button, dialog and card components to my project

### Other Clients

For Codex, configure in `~/.codex/config.toml` with `mcp_servers.shadcn` section.

---

## Critical Rules

### Always Do

✅ **Run `init` before adding components**

- Creates required configuration and utilities
- Sets up path aliases

✅ **Use CSS variables for theming** (`cssVariables: true`)

- Enables dark mode support
- Flexible theme customization

✅ **Configure TypeScript path aliases**

- Required for component imports
- Must match `components.json` aliases

✅ **Keep components.json in version control**

- Team members need same configuration
- Documents project setup

### Never Do

❌ **Don't change `style` after initialization**

- Requires complete reinstall
- Reinitialize in new directory instead

❌ **Don't mix Radix Vue and Reka UI v2**

- Incompatible component APIs
- Use one or the other

❌ **Don't skip TypeScript configuration**

- Component imports will fail
- IDE autocomplete won't work

❌ **Don't use without Tailwind CSS**

- Components are styled with Tailwind
- Won't render correctly

---

## Common Mistakes

- Running `add` before `init` and missing `components.json`.
- Forgetting to enable the MCP server in the client UI/config.
- Mis-typed registry namespaces (`@namespace/component`).
- Using CSS variable classes without `tailwind.cssVariables: true`.

---

## Top 7 Critical Issues

### Issue #1: Missing TypeScript Path Aliases

**Error**: `Cannot find module '@/components/ui/button'`

**Solution**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Issue #2: Tailwind CSS Not Configured

**Error**: Components render without styles

**Solution**:

```css
/* src/assets/index.css */
@import "tailwindcss";
```

```typescript
// vite.config.ts (Tailwind v4)
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```

---

### Issue #3: CSS Variables Not Defined

**Error**: Theme colors not applying, gray/transparent components

**Solution**: Ensure all CSS variables are defined (run `init` command)

---

### Issue #4: Wrong Style Selected

**Error**: Components look different than expected

**Solution**: Choose carefully during `init` (New York or Default) - cannot change later without reinstall

---

### Issue #5: Mixing Radix Vue and Reka UI

**Error**: Type conflicts, duplicate components

**Solution**:

- Use `npx shadcn-vue@latest` for Reka UI v2
- Use `npx shadcn-vue@radix` for legacy Radix Vue
- Don't mix both

---

### Issue #6: Monorepo Path Issues

**Error**: Components installed in wrong directory

**Solution**: Use `-c` flag to specify workspace:

```bash
npx shadcn-vue@latest init -c ./apps/web
npx shadcn-vue@latest add button -c ./apps/web
```

---

### Issue #7: Component Import Fails After Manual Edit

**Error**: Import paths broken after editing `components.json`

**Solution**: Keep `components.json` and `tsconfig.json` aliases in sync. Test imports after any config changes.

---

**See All 7 Issues**: `references/error-catalog.md`

---

## CLI Commands Reference

### init Command

```bash
# Initialize in current directory
npx shadcn-vue@latest init

# Initialize in specific directory (monorepo)
npx shadcn-vue@latest init -c ./apps/web
```

### add Command

```bash
# Add single component
npx shadcn-vue@latest add button

# Add multiple components
npx shadcn-vue@latest add button card dialog

# Add all components
npx shadcn-vue@latest add --all
```

### diff Command

```bash
# Check for component updates
npx shadcn-vue@latest diff button
```

### mcp Command

```bash
# Initialize MCP for specific client
npx shadcn-vue@latest mcp init --client opencode
npx shadcn-vue@latest mcp init --client codex
npx shadcn-vue@latest mcp init --client cursor
npx shadcn-vue@latest mcp init --client vscode
```

---

## Reka UI v2 Migration

shadcn-vue now uses **Reka UI v2** (formerly Radix Vue) as its foundation. All new components use Reka UI primitives.

**Migration:** Existing projects should update to Reka UI v2. See official migration guide: [shadcn-vue.com/docs/changelog#reka-ui](https://shadcn-vue.com/docs/changelog#reka-ui)

---

## Configuration

shadcn-vue uses `components.json` to configure:

- Component paths (`@/components/ui`)
- Utils location (`@/lib/utils`)
- Tailwind config paths
- TypeScript paths

**Full example:** See `templates/components.json` or generate via `npx shadcn-vue@latest init`

---

## Utils Library

The `@/lib/utils.ts` file provides the `cn()` helper for merging Tailwind classes:

- Combines multiple className strings
- Uses `clsx` + `tailwind-merge` for conflict resolution

**Auto-generated** by `shadcn-vue init` - no manual setup needed.

---

## Bundled Resources

**Templates** (`templates/`):

- `quick-setup.ts` - Complete setup guide for Vue/Nuxt with examples (190 lines)

**References** (`references/`):

- `cli.md` - CLI commands and options
- `mcp.md` - MCP setup, client configs, prompts
- `theming.md` - Theming and `cssVariables`
- `dark-mode-vite.md` - Vite dark mode example
- `error-catalog.md` - All 7 documented issues with solutions (267 lines)

**Component Documentation** (`components/`):

- `components.md` - Auto-generated index of all 64 shadcn-vue components
- `components/<component>.md` - Individual component documentation with installation, usage, and examples

---

## When to Load References

Load these references based on the task:

1. **Load `references/error-catalog.md` when:**
   - User encounters "component not found" or import errors
   - Setup commands fail or configuration issues arise
   - Tailwind CSS variables or TypeScript paths broken
   - **Trigger phrases:** "not working", "error", "fails to", "broken"

2. **Load `references/component-examples.md` when:**
   - User asks "how do I implement [component]?"
   - Need copy-paste examples for specific components
   - Building forms, tables, navigation, or data display
   - **Trigger phrases:** "example", "how to use", "implement", "code sample"

3. **Load `references/dark-mode-setup.md` when:**
   - Implementing dark mode / theme switching
   - User mentions Vue 3 + Vite, Nuxt, or Astro setup
   - Need composable patterns for theme management
   - **Trigger phrases:** "dark mode", "theme", "light/dark", "color scheme"

4. **Load `references/mcp.md` when:**
   - Setting up MCP server for opencode, Codex, Cursor, VS Code
   - Configuring registries in `components.json`
   - Troubleshooting missing components or registry namespaces
   - **Trigger phrases:** "MCP", "opencode", "codex", "cursor", "registry"

---

## Integration with Other Skills

This skill composes well with:

- **nuxt-v4** → Nuxt framework
- **tailwind-v4-shadcn** → Tailwind v4 with React shadcn/ui
- **react-hook-form-zod** → Form validation patterns (similar to Auto Form)
- **tanstack-query** → Data fetching for tables
- **zustand-state-management** → State management

---

## Resources

**References** (`references/`):

- `component-examples.md` - All 50+ component examples with code
- `dark-mode-setup.md` - Complete dark mode implementation guide
- `error-catalog.md` - Common errors and solutions

**Templates** (`templates/`):

- Component templates available in references/component-examples.md

---

## Additional Resources

**Official Documentation**:

- shadcn-vue Docs: https://shadcn-vue.com
- Reka UI Docs: https://reka-ui.com
- GitHub: https://github.com/radix-vue/shadcn-vue

**Examples**:

- Component Examples: https://shadcn-vue.com/examples
