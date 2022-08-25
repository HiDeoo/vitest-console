import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { mockConsole } from '../src'
import { createMatchers, MATCHERS_DEFINITIONS } from '../src/matchers'

import { TEST_ASSERTION_DEFINTIONS } from './utils'

expect.extend(createMatchers())

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

const testDefinitions = MATCHERS_DEFINITIONS.map(
  (definition) => [`toHave${definition.name}Times`, definition.method, console[definition.method]] as const
)

describe.each(testDefinitions)('%s', (matcher, method, consoleMethod) => {
  describe.each(TEST_ASSERTION_DEFINTIONS)('$name', ({ not }) => {
    test(`should pass if console.${method} was ${not ? 'not ' : ''}called 2 times`, () => {
      expect(() => {
        if (!not) {
          consoleMethod('test 1')
          consoleMethod('test 2')
        }

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher](2)
      }).not.toThrowError()
    })

    test(`should fail if console.${method} was ${!not ? 'not ' : ''}called 3 times`, () => {
      expect(() => {
        if (not) {
          consoleMethod('test 1')
          consoleMethod('test 2')
          consoleMethod('test 3')
        }

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher](3)
      }).toThrowError(
        not
          ? `Expected 'console.${method}' to not be called 3 times but it was called 3 times`
          : `Expected 'console.${method}' to be called 3 times but it was called 0 times`
      )
    })
  })
})
