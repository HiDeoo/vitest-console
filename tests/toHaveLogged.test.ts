import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { mockConsole } from '../src'
import { toHaveLogged } from '../src/matchers/toHaveLogged'

expect.extend({ toHaveLogged })

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

describe.each([
  { name: 'to equal', not: false },
  { name: 'to not equal', not: true },
])('$name', ({ not }) => {
  test(`should pass if console.log was ${not ? 'not ' : ''}called`, () => {
    expect(() => {
      if (!not) {
        console.log('test')
      }

      let assertion = expect(console)

      if (not) {
        assertion = assertion.not
      }

      assertion.toHaveLogged()
    }).not.toThrowError()
  })

  test(`should fail if console.log was ${!not ? 'not ' : ''}called`, () => {
    expect(() => {
      if (not) {
        console.log('test 1')
        console.log('test 2')
        console.log('test 3')
      }

      let assertion = expect(console)

      if (not) {
        assertion = assertion.not
      }

      assertion.toHaveLogged()
    }).toThrowError(
      not
        ? `Expected 'console.log' to not be called at all but it was called 3 times`
        : `Expected 'console.log' to be called at least once but it was called 0 times`
    )
  })
})
