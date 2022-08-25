import { createMatchers, type Matcher } from './matchers'
import { type createToHaveMatcher } from './matchers/toHave'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = createMatchers()

export interface Matchers {
  // TODO(HiDeoo)
  toHaveErrored: Matcher<typeof createToHaveMatcher>

  toHaveInformed: Matcher<typeof createToHaveMatcher>

  toHaveLogged: Matcher<typeof createToHaveMatcher>

  toHaveWarned: Matcher<typeof createToHaveMatcher>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
