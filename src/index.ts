import { createMatchers, type Matcher } from './matchers'
import { type createToHaveMatcher } from './matchers/toHave'
import { type createToHaveTimesMatcher } from './matchers/toHaveTimes'
import { type createToHaveWithMatcher } from './matchers/toHaveWith'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = createMatchers()

// TODO(HiDeoo)
export interface Matchers {
  toHaveErrored: Matcher<typeof createToHaveMatcher>
  toHaveErroredTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveErroredWith: Matcher<typeof createToHaveWithMatcher>

  toHaveInformed: Matcher<typeof createToHaveMatcher>
  toHaveInformedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveInformedWith: Matcher<typeof createToHaveWithMatcher>

  toHaveLogged: Matcher<typeof createToHaveMatcher>
  toHaveLoggedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveLoggedWith: Matcher<typeof createToHaveWithMatcher>

  toHaveWarned: Matcher<typeof createToHaveMatcher>
  toHaveWarnedTimes: Matcher<typeof createToHaveTimesMatcher>
  toHaveWarnedWith: Matcher<typeof createToHaveWithMatcher>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
