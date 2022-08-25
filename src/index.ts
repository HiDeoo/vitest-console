import { createMatchers, type Matcher } from './matchers'
import { type createToHaveMatcher } from './matchers/toHave'
import { type createToHaveTimesMatcher } from './matchers/toHaveTimes'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = createMatchers()

// TODO(HiDeoo)
export interface Matchers {
  toHaveErrored: Matcher<typeof createToHaveMatcher>
  toHaveErroredTimes: Matcher<typeof createToHaveTimesMatcher>

  toHaveInformed: Matcher<typeof createToHaveMatcher>
  toHaveInformedTimes: Matcher<typeof createToHaveTimesMatcher>

  toHaveLogged: Matcher<typeof createToHaveMatcher>
  toHaveLoggedTimes: Matcher<typeof createToHaveTimesMatcher>

  toHaveWarned: Matcher<typeof createToHaveMatcher>
  toHaveWarnedTimes: Matcher<typeof createToHaveTimesMatcher>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
