import { createMatchers, type Matcher } from './matchers'
import { type createToHaveMatcher } from './matchers/toHave'
import { type createToHaveLastWithMatcher } from './matchers/toHaveLastWith'
import { type createToHaveNthWithMatcher } from './matchers/toHaveNthWith'
import { type createToHaveTimesMatcher } from './matchers/toHaveTimes'
import { type createToHaveWithMatcher } from './matchers/toHaveWith'

export { type ConsoleMock, type ConsoleMockOptions, mockConsole } from './libs/mock'

export const matchers = createMatchers()

export interface Matchers {
  /**
   * Asserts that an error was logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if an error was logged', () => {
   *   expect(console).toHaveErrored()
   * })
   * ```
   */
  toHaveErrored: Matcher<typeof createToHaveMatcher>

  /**
   * Asserts that a certain amount of errors were logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if 3 errors were logged', () => {
   *   expect(console).toHaveErroredTimes(3)
   * })
   * ```
   */
  toHaveErroredTimes: Matcher<typeof createToHaveTimesMatcher>

  /**
   * Asserts that an error was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if an error was logged with a specific text and number', () => {
   *   expect(console).toHaveErroredWith('the error message', 123)
   * })
   * ```
   */
  toHaveErroredWith: Matcher<typeof createToHaveWithMatcher>

  /**
   * Asserts that errors were logged and that the last one was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the last error was logged with a specific text and number', () => {
   *   expect(console).toHaveLastErroredWith('the last error message', 123)
   * })
   * ```
   */
  toHaveLastErroredWith: Matcher<typeof createToHaveLastWithMatcher>

  /**
   * Asserts that errors were logged and that a specific one was logged with certain parameters.
   *
   * The count starts at 1.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the second error was logged with a specific text and number', () => {
   *   expect(console).toHaveNthErroredWith(2, 'the second error message', 123)
   * })
   * ```
   */
  toHaveNthErroredWith: Matcher<typeof createToHaveNthWithMatcher>

  /**
   * Asserts that an informational message was logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if an informational message was logged', () => {
   *   expect(console).toHaveInformed()
   * })
   * ```
   */
  toHaveInformed: Matcher<typeof createToHaveMatcher>

  /**
   * Asserts that a certain amount of informational messages were logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if 3 informational messages were logged', () => {
   *   expect(console).toHaveInformedTimes(3)
   * })
   * ```
   */
  toHaveInformedTimes: Matcher<typeof createToHaveTimesMatcher>

  /**
   * Asserts that an informational message was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if an informational message was logged with a specific text and number', () => {
   *   expect(console).toHaveInformedWith('the informational message', 123)
   * })
   * ```
   */
  toHaveInformedWith: Matcher<typeof createToHaveWithMatcher>

  /**
   * Asserts that informational messages were logged and that the last one was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the last informational message was logged with a specific text and number', () => {
   *   expect(console).toHaveLastInformedWith('the last informational message', 123)
   * })
   * ```
   */
  toHaveLastInformedWith: Matcher<typeof createToHaveLastWithMatcher>

  /**
   * Asserts that informational messages were logged and that a specific one was logged with certain parameters.
   *
   * The count starts at 1.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the second informational message was logged with a specific text and number', () => {
   *   expect(console).toHaveNthInformedWith(2, 'the second informational message', 123)
   * })
   * ```
   */
  toHaveNthInformedWith: Matcher<typeof createToHaveNthWithMatcher>

  /**
   * Asserts that a message was logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a message was logged', () => {
   *   expect(console).toHaveLogged()
   * })
   * ```
   */
  toHaveLogged: Matcher<typeof createToHaveMatcher>

  /**
   * Asserts that a certain amount of messages were logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if 3 messages were logged', () => {
   *   expect(console).toHaveLoggedTimes(3)
   * })
   * ```
   */
  toHaveLoggedTimes: Matcher<typeof createToHaveTimesMatcher>

  /**
   * Asserts that a message was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a message was logged with a specific text and number', () => {
   *   expect(console).toHaveLoggedWith('the message', 123)
   * })
   * ```
   */
  toHaveLoggedWith: Matcher<typeof createToHaveWithMatcher>

  /**
   * Asserts that messages were logged and that the last one was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the last message was logged with a specific text and number', () => {
   *   expect(console).toHaveLastLoggedWith('the last message', 123)
   * })
   * ```
   */
  toHaveLastLoggedWith: Matcher<typeof createToHaveLastWithMatcher>

  /**
   * Asserts that messages were logged and that a specific one was logged with certain parameters.
   *
   * The count starts at 1.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the second message was logged with a specific text and number', () => {
   *   expect(console).toHaveNthLoggedWith(2, 'the second message', 123)
   * })
   * ```
   */
  toHaveNthLoggedWith: Matcher<typeof createToHaveNthWithMatcher>

  /**
   * Asserts that a warning was logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a message was logged', () => {
   *   expect(console).toHaveWarned()
   * })
   * ```
   */
  toHaveWarned: Matcher<typeof createToHaveMatcher>

  /**
   * Asserts that a certain amount of warnings were logged.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if 3 warnings were logged', () => {
   *   expect(console).toHaveWarnedTimes(3)
   * })
   * ```
   */
  toHaveWarnedTimes: Matcher<typeof createToHaveTimesMatcher>

  /**
   * Asserts that a warning was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if a warning was logged with a specific text and number', () => {
   *   expect(console).toHaveWarnedWith('the warning', 123)
   * })
   * ```
   */
  toHaveWarnedWith: Matcher<typeof createToHaveWithMatcher>

  /**
   * Asserts that warnings were logged and that the last one was logged with certain parameters.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the last warning was logged with a specific text and number', () => {
   *   expect(console).toHaveLastWarnedWith('the last warning', 123)
   * })
   * ```
   */
  toHaveLastWarnedWith: Matcher<typeof createToHaveLastWithMatcher>

  /**
   * Asserts that warnings were logged and that a specific one was logged with certain parameters.
   *
   * The count starts at 1.
   *
   * @example
   * ```ts
   * import { expect, test } from 'vitest'
   *
   * test('should test if the second warning was logged with a specific text and number', () => {
   *   expect(console).toHaveNthWarnedWith(2, 'the second warning', 123)
   * })
   * ```
   */
  toHaveNthWarnedWith: Matcher<typeof createToHaveNthWithMatcher>
}

declare global {
  namespace Vi {
    interface Assertion extends Matchers {}
    interface AsymmetricMatchersContaining extends Matchers {}
  }
}
