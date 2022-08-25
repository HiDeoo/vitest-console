import 'vitest'

import { type ConsoleMethod } from '../libs/console'

import { createToHaveMatcher } from './toHave'
import { createToHaveTimesMatcher } from './toHaveTimes'

export const MATCHERS_DEFINITIONS = [
  { method: 'error', name: 'Errored' },
  { method: 'info', name: 'Informed' },
  { method: 'log', name: 'Logged' },
  { method: 'warn', name: 'Warned' },
] as const

export function createMatchers() {
  const matchers: RawMatchers = {}

  for (const definition of MATCHERS_DEFINITIONS) {
    matchers[`toHave${definition.name}`] = createToHaveMatcher(definition.method)
    matchers[`toHave${definition.name}Times`] = createToHaveTimesMatcher(definition.method)
  }

  return matchers
}

type RawMatcher = RawMatchers[string]
type RawMatchers = Parameters<Vi.ExpectStatic['extend']>[0]

export type Matcher<T extends (method: ConsoleMethod) => RawMatcher> = Parameters<ReturnType<T>> extends [
  unknown,
  ...infer U
]
  ? (...args: U) => void
  : () => void

export type MatcherState = ReturnType<Vi.ExpectStatic['getState']>
