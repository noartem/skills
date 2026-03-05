# Vue 3 Decomposition Playbook

Use this playbook when splitting a large Vue 3 component.

## 1) Identify Seams

Split logic by concern, not by line count:

- UI rendering blocks
- Async data loading
- Derived state and filters
- User actions (submit, delete, select)
- Browser effects (event listeners, resize, observers)

If a section can be explained independently, it is a candidate for extraction.

## 2) Extract Child Components

Start with repeated or visually distinct template regions.

Good candidates:

- Toolbars, filters, headers
- Tables/lists and list rows
- Forms and modal bodies

Define a minimal API per child:

- Props: input data only
- Emits: user intent only (`save`, `cancel`, `delete`)
- Slots: layout customization

## 3) Extract Composables

Move stateful logic that is reused or noisy in the parent.

Composable shape:

```ts
export function useSomething(input: MaybeRefOrGetter<string>) {
  const value = ref("")
  const loading = ref(false)
  const error = ref<Error | null>(null)

  watchEffect(() => {
    const normalized = toValue(input)
    // react to normalized input
  })

  return { value, loading, error }
}
```

Rules:

- Return plain object of refs/computed/methods.
- Keep one responsibility per composable.
- Cleanup side effects in `onUnmounted()`.

## 4) Keep Parent as Orchestrator

Parent component should compose children and composables:

- wires composables together
- maps outputs to child props
- handles top-level route/page concerns

If parent starts owning low-level details again, extract one more seam.

## 5) Contract and Naming Guidelines

- Multi-word component names (`OrdersTableRow.vue`).
- Composable names start with `use` (`useOrdersFilters.ts`).
- Prefer full words over abbreviations in file names.
- Keep naming consistent (PascalCase for components, camelCase for props declarations).

## 6) Anti-Patterns

- Passing large mutable objects everywhere instead of focused props.
- Child components mutating business state directly.
- One composable handling API, validation, analytics, and UI flags.
- `v-if` and `v-for` on the same element.
- Heavy inline template expressions.

## 7) Done Criteria

- Each extracted unit has a clear responsibility.
- Templates are mostly declarative and easy to scan.
- Data flow direction is clear (parent down, events up).
- Logic can be tested at composable or child level without full page setup.
