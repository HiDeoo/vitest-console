import { expect, test } from 'vitest'

import { toHaveLogged } from '../src/matchers/toHaveLogged'

expect.extend({ toHaveLogged })

test('should fail if the console is not mocked', () => {
  expect(() => {
    expect(console).toHaveLogged()
  }).toThrowError("'console.log' is not a mock! Did you forget to call `mockConsole()`?")
})
