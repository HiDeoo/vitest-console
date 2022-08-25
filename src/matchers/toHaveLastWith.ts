import { type ConsoleMethod } from '../libs/console'
import { getConsoleMock } from '../libs/mock'
import { getResultWithArgs } from '../libs/result'

import { type MatcherState } from '.'

export function createToHaveLastWithMatcher(method: ConsoleMethod) {
  return function (this: MatcherState, received: Console, ...expectedArgs: any[]) {
    const { equals, isNot, utils } = this

    const receivedMock = getConsoleMock(received, method)

    if (receivedMock.error) {
      return receivedMock.error
    }

    const lastCall = receivedMock.mock.calls[receivedMock.mock.calls.length - 1]

    return getResultWithArgs(
      utils,
      equals(lastCall, expectedArgs, [utils.iterableEquality]),
      `Expected 'console.${method}' to ${isNot ? 'not ' : ''}be last called with arguments`,
      expectedArgs,
      lastCall ? [lastCall] : []
    )
  }
}
