import { type Matcher } from './matchers'
import { toHaveLogged } from './matchers/toHaveLogged'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = { toHaveLogged }

export interface Matchers {
  // TODO(HiDeoo)
  toHaveLogged: Matcher<typeof toHaveLogged>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
