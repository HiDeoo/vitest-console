import { type EnhancedSpy, vi } from 'vitest'

import { type ConsoleMethod, type ConsoleMethods, DEFAULT_CONSOLE_METHODS } from './console'
import { getResult } from './result'

export function mockConsole(methods?: ConsoleMethods): ConsoleMock
export function mockConsole(options?: ConsoleMockOptions): ConsoleMock
export function mockConsole(methods: ConsoleMethods, options: ConsoleMockOptions): ConsoleMock
export function mockConsole(
  methodsOrOptions?: ConsoleMethods | ConsoleMockOptions,
  options?: ConsoleMockOptions
): ConsoleMock {
  const withMethods = Array.isArray(methodsOrOptions)

  const methods = withMethods ? methodsOrOptions : DEFAULT_CONSOLE_METHODS
  const opts = withMethods ? options : methodsOrOptions

  for (const method of methods) {
    const spy = vi.spyOn(console, method)

    if (opts?.quiet) {
      spy.mockImplementation(() => undefined)
    }
  }

  function clearConsole() {
    for (const method of methods) {
      vi.mocked(globalThis.console[method]).mockClear()
    }
  }

  function restoreConsole() {
    for (const method of methods) {
      vi.mocked(globalThis.console[method]).mockRestore()
    }
  }

  return { clearConsole, restoreConsole }
}

export interface ConsoleMock {
  clearConsole: () => void
  restoreConsole: () => void
}

export interface ConsoleMockOptions {
  quiet?: boolean
}

export function getConsoleMock(console: Console, method: ConsoleMethod) {
  const mock = console[method]

  if (
    typeof mock !== 'function' ||
    !('_isMockFunction' in mock) ||
    !(mock as ((...args: any[]) => unknown) & { _isMockFunction: true })._isMockFunction
  ) {
    return {
      error: getResult(false, `'console.${method}' is not a mock! Did you forget to call \`mockConsole()\`?`),
    }
  }

  return { mock: mock as EnhancedSpy }
}
