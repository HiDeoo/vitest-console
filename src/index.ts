import { vi } from 'vitest'

import { type ConsoleMethods, DEFAULT_CONSOLE_METHODS } from './console'

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
