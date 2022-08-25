import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { mockConsole } from '../src'
import { createMatchers, MATCHERS_DEFINITIONS } from '../src/matchers'

import { TEST_ASSERTION_DEFINTIONS } from './utils'

expect.extend(createMatchers())

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

const testDefinitions = MATCHERS_DEFINITIONS.map(
  (definition) => [`toHaveNth${definition.name}With`, definition.method, console[definition.method]] as const
)

describe.each(testDefinitions)('%s', (matcher, method, consoleMethod) => {
  describe.each(TEST_ASSERTION_DEFINTIONS)('$name', ({ not }) => {
    test(`should pass if console.${method} call #2 was ${not ? 'not ' : ''}called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test', 1)
        consoleMethod('this', 'is', 'a', 'test', not ? 2.5 : 2)
        consoleMethod('this', 'is', 'a', 'test', 3)

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher](2, 'this', 'is', 'a', 'test', 2)
      }).not.toThrowError()
    })

    test(`should fail if console.${method} call #3 was ${!not ? 'not ' : ''}called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test', 1)
        consoleMethod('this', 'is', 'a', 'test', 2)
        consoleMethod('this', 'is', 'a', 'test', not ? 3 : 2.5)
        consoleMethod('this', 'is', 'a', 'test', 4)

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher](3, 'this', 'is', 'a', 'test', 3)
      }).toThrowError(
        not
          ? `Expected 'console.${method}' call #3 to not be called with arguments [ "this", "is", "a", "test", 3 ]`
          : new RegExp(
              `^Expected 'console.${method}' call #3 to be called with arguments \\[ "this", "is", "a", "test", 3 ] but received:`
            )
      )
    })

    test(`should pass if console.${method} call #2 was ${!not ? 'not ' : ''}last with no arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test', 1)

        if (!not) {
          consoleMethod()
        } else {
          consoleMethod('this', 'is', 'a', 'test', 2)
        }

        consoleMethod('this', 'is', 'a', 'test', 3)

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher](2)
      }).not.toThrowError()
    })
  })

  test(`should fail if console.${method} was not called at all`, () => {
    expect(() => {
      expect(console)[matcher](2, 'this', 'is', 'a', 'test')
    }).toThrowError(`Expected 'console.${method}' call #2 to be called with arguments [ "this", "is", "a", "test" ]`)
  })
})
