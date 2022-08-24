import { expect, test, vi } from 'vitest'

import { mockConsole } from '../src'
import { type ConsoleMethods, DEFAULT_CONSOLE_METHODS } from '../src/libs/console'

test('should mock default console methods', () => {
  const { restoreConsole } = mockConsole({ quiet: true })

  callConsoleMethods()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.mock).toBeDefined()
    expect(methodMock).toHaveBeenCalledOnce()
  }

  restoreConsole()
})

test('should return a function to restore mocked default console methods', () => {
  const { restoreConsole } = mockConsole({ quiet: true })

  callConsoleMethods()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).toHaveBeenCalledOnce()
  }

  restoreConsole()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).not.toBeDefined()
    expect(methodMock).not.toHaveBeenCalled()
  }
})

test('should return a function to clear mocked default console methods', () => {
  const { clearConsole, restoreConsole } = mockConsole({ quiet: true })

  callConsoleMethods()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).toHaveBeenCalledOnce()
  }

  clearConsole()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).not.toHaveBeenCalledOnce()
  }

  restoreConsole()
})

test('should mock specified console methods', () => {
  const methods: ConsoleMethods = ['error', 'info']

  const { restoreConsole } = mockConsole(methods, { quiet: true })

  callConsoleMethods(methods)

  for (const method of DEFAULT_CONSOLE_METHODS) {
    const methodMock = vi.mocked(console[method])

    if (methods.includes(method)) {
      expect(methodMock.mock).toBeDefined()
      expect(methodMock).toHaveBeenCalledOnce()
    } else if ('mock' in methodMock) {
      expect(methodMock).not.toHaveBeenCalled()
    }
  }

  restoreConsole()
})

test('should return a function to restore mocked specified console methods', () => {
  const methods: ConsoleMethods = ['info', 'log']

  const { restoreConsole } = mockConsole(methods, { quiet: true })

  callConsoleMethods(methods)

  for (const method of methods) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).toHaveBeenCalledOnce()
  }

  restoreConsole()

  for (const method of methods) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).not.toBeDefined()
    expect(methodMock).not.toHaveBeenCalled()
  }
})

test('should return a function to clear mocked specified console methods', () => {
  const methods: ConsoleMethods = ['info', 'log']

  const { clearConsole, restoreConsole } = mockConsole(methods, { quiet: true })

  callConsoleMethods(methods)

  for (const method of methods) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).toHaveBeenCalledOnce()
  }

  clearConsole()

  for (const method of methods) {
    const methodMock = vi.mocked(console[method])

    expect(methodMock.getMockImplementation()).toBeDefined()
    expect(methodMock).not.toHaveBeenCalled()
  }

  restoreConsole()
})

test('should not modify the implementation by default', () => {
  const { restoreConsole } = mockConsole()

  for (const method of DEFAULT_CONSOLE_METHODS) {
    expect(vi.mocked(console[method]).getMockImplementation()).not.toBeDefined()
  }

  restoreConsole()
})

test('should modify the implementation with the quiet option enabled', () => {
  const { restoreConsole } = mockConsole({ quiet: true })

  for (const method of DEFAULT_CONSOLE_METHODS) {
    expect(vi.mocked(console[method]).getMockImplementation()).toBeDefined()
  }

  restoreConsole()
})

function callConsoleMethods(methods: ConsoleMethods = DEFAULT_CONSOLE_METHODS) {
  for (const method of methods) {
    console[method].call(console, `${method} test`)
  }
}
