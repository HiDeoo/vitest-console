import { getConsoleMock } from '../libs/mock'
import { getResult } from '../libs/result'

import { type MatcherState } from '.'

export function toHaveLogged(this: MatcherState, received: Console) {
  const { isNot } = this

  const method = 'log'

  const receivedMock = getConsoleMock(received, method)

  if (receivedMock.error) {
    return receivedMock.error
  }

  return getResult(
    receivedMock.mock.calls.length > 0,
    `Expected 'console.${method}' to ${isNot ? 'not ' : ''}be called ${
      isNot ? 'at all' : 'at least once'
    } but it was called ${receivedMock.mock.calls.length} times`
  )
}
