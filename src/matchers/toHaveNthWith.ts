import { type ConsoleMethod } from '../libs/console'
import { getConsoleMock } from '../libs/mock'
import { getResultWithArgs } from '../libs/result'

import { type MatcherState } from '.'

export function createToHaveNthWithMatcher(method: ConsoleMethod) {
  return function (this: MatcherState, received: Console, times: number, ...expectedArgs: any[]) {
    const { equals, isNot, utils } = this

    const receivedMock = getConsoleMock(received, method)

    if (receivedMock.error) {
      return receivedMock.error
    }

    const nthCall = receivedMock.mock.calls[times - 1]

    return getResultWithArgs(
      utils,
      equals(nthCall, expectedArgs, [utils.iterableEquality]),
      `Expected 'console.${method}' call #${times} to ${isNot ? 'not ' : ''}be called with arguments`,
      expectedArgs,
      nthCall ? [nthCall] : []
    )
  }
}
