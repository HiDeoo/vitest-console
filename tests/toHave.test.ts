import { afterAll, afterEach, describe, expect, test } from 'vitest'

import { type Matchers, mockConsole } from '../src'
import { createMatchers, MATCHERS_DEFINITIONS } from '../src/matchers'

expect.extend(createMatchers())

const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

afterEach(clearConsole)
afterAll(restoreConsole)

const testDefinitions = MATCHERS_DEFINITIONS.map(
  (definition) => [`toHave${definition.name}` as keyof Matchers, definition.method, console[definition.method]] as const
)

describe.each(testDefinitions)('%s', (matcher, method, consoleMethod) => {
  describe.each([
    { name: 'to be', not: false },
    { name: 'to not be', not: true },
  ])('$name', ({ not }) => {
    test(`should pass if console.${method} was ${not ? 'not ' : ''}called`, () => {
      expect(() => {
        if (!not) {
          consoleMethod('test')
        }

        let assertion = expect(console)

        if (not) {
          assertion = assertion.not
        }

        assertion[matcher]()
      }).not.toThrowError()
    })

    test(`should fail if console.${method} was ${!not ? 'not ' : ''}called`, () => {
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

        assertion[matcher]()
      }).toThrowError(
        not
          ? `Expected 'console.${method}' to not be called at all but it was called 3 times`
          : `Expected 'console.${method}' to be called at least once but it was called 0 times`
      )
    })
  })
})
