import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { mockConsole } from '../src'
import { createMatchers, MATCHERS_DEFINITIONS } from '../src/matchers'

import { TEST_ASSERTION_DEFINTIONS } from './utils'

expect.extend(createMatchers())

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

const testDefinitions = MATCHERS_DEFINITIONS.map(
  (definition) => [`toHaveLast${definition.name}With`, definition.method, console[definition.method]] as const
)

describe.each(testDefinitions)('%s', (matcher, method, consoleMethod) => {
  describe.each(TEST_ASSERTION_DEFINTIONS)('$name', ({ not }) => {
    test(`should pass if console.${method} was ${not ? 'not ' : ''}last called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test', 1)
        consoleMethod('this', 'is', 'a', 'test', not ? 3 : 2)

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]('this', 'is', 'a', 'test', 2)
      }).not.toThrowError()
    })

    test(`should fail if console.${method} was ${!not ? 'not ' : ''}last called with the expected arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test', 1)
        consoleMethod('this', 'is', 'a', 'test', not ? 2 : 3)

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]('this', 'is', 'a', 'test', 2)
      }).toThrowError(
        not
          ? `Expected 'console.${method}' to not be last called with arguments [ "this", "is", "a", "test", 2 ]`
          : new RegExp(
              `^Expected 'console.${method}' to be last called with arguments \\[ "this", "is", "a", "test", 2 ] but received:`
            )
      )
    })

    test(`should pass if console.${method} was ${!not ? 'not ' : ''}last called with no arguments`, () => {
      expect(() => {
        consoleMethod('this', 'is', 'a', 'test')

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
    }).toThrowError(`Expected 'console.${method}' to be last called with arguments [ "this", "is", "a", "test" ]`)
  })
})
