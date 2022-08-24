import 'vitest'

export type Matcher<T extends (...args: any[]) => unknown> = Parameters<T> extends [unknown, ...infer U]
  ? (...args: U) => void
  : () => void

export type MatcherState = ReturnType<Vi.ExpectStatic['getState']>
