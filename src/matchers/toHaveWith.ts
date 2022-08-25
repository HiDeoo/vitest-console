import { type ConsoleMethod } from '../libs/console'
import { getConsoleMock } from '../libs/mock'
import { getResultWithArgs } from '../libs/result'

import { type MatcherState } from '.'

export function createToHaveWithMatcher(method: ConsoleMethod) {
  return function (this: MatcherState, received: Console, ...expectedArgs: any[]) {
    const { equals, isNot, utils } = this

    const receivedMock = getConsoleMock(received, method)

    if (receivedMock.error) {
      return receivedMock.error
    }

    return getResultWithArgs(
      utils,
      receivedMock.mock.calls.some((args) => equals(args, expectedArgs, [utils.iterableEquality])),
      `Expected 'console.${method}' to ${isNot ? 'not ' : ''}be called with arguments`,
      expectedArgs,
      receivedMock.mock.calls
    )
  }
}
