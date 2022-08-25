import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { mockConsole } from '../src'
import { createMatchers, MATCHERS_DEFINITIONS } from '../src/matchers'

import { TEST_ASSERTION_DEFINTIONS } from './utils'

expect.extend(createMatchers())

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

const testDefinitions = MATCHERS_DEFINITIONS.map(
  (definition) => [`toHave${definition.name}With`, definition.method, console[definition.method]] as const
)

describe.each(testDefinitions)('%s', (matcher, method, consoleMethod) => {
  describe.each(TEST_ASSERTION_DEFINTIONS)('$name', ({ not }) => {
    test(`should pass if console.${method} was ${not ? 'not ' : ''}called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', true, not ? 'wrong' : 'test')

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]('this', 'is', 'a', true, 'test')
      }).not.toThrowError()
    })

    test(`should fail if console.${method} was ${!not ? 'not ' : ''}called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', not ? 'a' : 'the', 'test')

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]('this', 'is', 'a', 'test')
      }).toThrowError(
        not
          ? `Expected 'console.${method}' to not be called with arguments [ "this", "is", "a", "test" ]`
          : new RegExp(
              `^Expected 'console.${method}' to be called with arguments \\[ "this", "is", "a", "test" ] but received:`
            )
      )
    })

    test(`should pass if console.${method} was ${!not ? 'not ' : ''}called with no arguments`, () => {
      expect(() => {
        if (!not) {
          consoleMethod()
        } else {
          consoleMethod('test')
        }

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]()
      }).not.toThrowError()
    })
  })

  test(`should fail if console.${method} was not called at all`, () => {
    expect(() => {
      expect(console)[matcher]('this', 'is', 'a', 'test')
    }).toThrowError(`Expected 'console.${method}' to be called with arguments [ "this", "is", "a", "test" ]`)
  })
})
