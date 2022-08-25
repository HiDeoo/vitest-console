import { createMatchers, type Matcher } from './matchers'
import { type createToHaveMatcher } from './matchers/toHave'
import { type createToHaveLastWithMatcher } from './matchers/toHaveLastWith'
import { type createToHaveNthWithMatcher } from './matchers/toHaveNthWith'
import { type createToHaveTimesMatcher } from './matchers/toHaveTimes'
import { type createToHaveWithMatcher } from './matchers/toHaveWith'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = createMatchers()

// TODO(HiDeoo)
export interface Matchers {
  toHaveErrored: Matcher<typeof createToHaveMatcher>
  toHaveErroredTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveErroredWith: Matcher<typeof createToHaveWithMatcher>
  toHaveLastErroredWith: Matcher<typeof createToHaveLastWithMatcher>
  toHaveNthErroredWith: Matcher<typeof createToHaveNthWithMatcher>

  toHaveInformed: Matcher<typeof createToHaveMatcher>
  toHaveInformedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveInformedWith: Matcher<typeof createToHaveWithMatcher>
  toHaveLastInformedWith: Matcher<typeof createToHaveLastWithMatcher>
  toHaveNthInformedWith: Matcher<typeof createToHaveNthWithMatcher>

  toHaveLogged: Matcher<typeof createToHaveMatcher>
  toHaveLoggedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveLoggedWith: Matcher<typeof createToHaveWithMatcher>
  toHaveLastLoggedWith: Matcher<typeof createToHaveLastWithMatcher>
  toHaveNthLoggedWith: Matcher<typeof createToHaveNthWithMatcher>

  toHaveWarned: Matcher<typeof createToHaveMatcher>
  toHaveWarnedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveWarnedWith: Matcher<typeof createToHaveWithMatcher>
  toHaveLastWarnedWith: Matcher<typeof createToHaveLastWithMatcher>
  toHaveNthWarnedWith: Matcher<typeof createToHaveNthWithMatcher>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
