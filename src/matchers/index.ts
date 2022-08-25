import { type ConsoleMethod } from '../libs/console'
import { type Result } from '../libs/result'

import { createToHaveMatcher } from './toHave'
import { createToHaveLastWithMatcher } from './toHaveLastWith'
import { createToHaveNthWithMatcher } from './toHaveNthWith'
import { createToHaveTimesMatcher } from './toHaveTimes'
import { createToHaveWithMatcher } from './toHaveWith'

export const MATCHERS_DEFINITIONS = [
  { method: 'error', name: 'Errored' },
  { method: 'info', name: 'Informed' },
  { method: 'log', name: 'Logged' },
  { method: 'warn', name: 'Warned' },
] as const

export function createMatchers(): RawMatchers {
  const matchers: RawMatchers = {}

  for (const definition of MATCHERS_DEFINITIONS) {
    matchers[`toHave${definition.name}`] = createToHaveMatcher(definition.method)
    matchers[`toHave${definition.name}Times`] = createToHaveTimesMatcher(definition.method)
    matchers[`toHave${definition.name}With`] = createToHaveWithMatcher(definition.method)
    matchers[`toHaveLast${definition.name}With`] = createToHaveLastWithMatcher(definition.method)
    matchers[`toHaveNth${definition.name}With`] = createToHaveNthWithMatcher(definition.method)
  }

  return matchers
}

export type Matcher<T extends (method: ConsoleMethod) => (...args: any[]) => unknown> = Parameters<
  ReturnType<T>
> extends [unknown, ...infer U]
  ? (...args: U) => void
  : () => void

export type MatcherState = ReturnType<Vi.ExpectStatic['getState']>

type RawMatcher = (this: MatcherState, received: Console, ...args: any[]) => Result
export type RawMatchers = Record<string, RawMatcher>
