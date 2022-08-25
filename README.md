<div align="center">
  <h1>vitest-console 📰</h1>
  <p>Vitest <code>console</code> mocks and custom matchers</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/vitest-console/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/vitest-console/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/vitest-console/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/vitest-console" />
  </a>
  <br />
  <br />
</div>

Quickly mock various `console` methods in Vitest and track their calls with custom matchers.

- [Usage](#usage)
- [Mock](#mock)
- [Matchers](#matchers)
  - [toHaveErrored](#tohaveerrored)
  - [toHaveErroredTimes](#tohaveerroredtimes)
  - [toHaveErroredWith](#tohaveerroredwith)
  - [toHaveLastErroredWith](#tohavelasterroredwith)
  - [toHaveNthErroredWith](#tohaventherroredwith)
  - [toHaveInformed](#tohaveinformed)
  - [toHaveInformedTimes](#tohaveinformedtimes)
  - [toHaveInformedWith](#tohaveinformedwith)
  - [toHaveLastInformedWith](#tohavelastinformedwith)
  - [toHaveNthInformedWith](#tohaventhinformedwith)
  - [toHaveLogged](#tohavelogged)
  - [toHaveLoggedTimes](#tohaveloggedtimes)
  - [toHaveLoggedWith](#tohaveloggedwith)
  - [toHaveLastLoggedWith](#tohavelastloggedwith)
  - [toHaveNthLoggedWith](#tohaventhloggedwith)
  - [toHaveWarned](#tohavewarned)
  - [toHaveWarnedTimes](#tohavewarnedtimes)
  - [toHaveWarnedWith](#tohavewarnedwith)
  - [toHaveLastWarnedWith](#tohavelastwarnedwith)
  - [toHaveNthWarnedWith](#tohaventhwarnedwith)

## Usage

Install `vitest-console` with your favorite package manager:

```shell
$ pnpm add -D vitest-console
```

Add a setup file to your [Vitest configuration](https://vitest.dev/config/#configuration) and inline the `vitest-console` module:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    deps: {
      inline: ['vitest-console'],
    },
    setupFiles: ['tests-setup.ts'],
  },
})
```

Extends the built-in Vitest matchers with `vitest-console` in your setup file:

```ts
import { expect } from 'vitest'
import { matchers } from 'vitest-console'

expect.extend(matchers)
```

You can now mock various `console` methods either globally in your setup file, in a test file or even a `describe` block:

```ts
import { afterAll, afterEach } from 'vitest'
import { mockConsole } from 'vitest-console'

const { clearConsole, restoreConsole } = mockConsole()

afterEach(clearConsole)
afterAll(restoreConsole)
```

> **Note**
>
> You can also mock `console` methods in a specific test:
>
> ```ts
> test('should do the thing', () => {
>   const { restoreConsole } = mockConsole()
>
>   doTheThing()
>
>   expect(console).toHaveLogged('The thing was done.')
>
>   restoreConsole()
> })
> ```

## Mock

Mocks are set up using the `mockConsole` function:

```ts
mockConsole(methods?: ConsoleMethods): ConsoleMock
mockConsole(options?: ConsoleMockOptions): ConsoleMock
mockConsole(methods: ConsoleMethods, options: ConsoleMockOptions): ConsoleMock
```

### Parameters

#### `methods`

By default, `console.error`, `console.info`, `console.log` and `console.warn` are mocked but you can specify your own list of methods to mock:

```ts
import { mockConsole } from 'vitest-console'

mockConsole(['log', 'table'])
```

#### `options`

You can silence any console output during tests using the `quiet` option:

```ts
import { mockConsole } from 'vitest-console'

mockConsole({ quiet: true })
```

### Return value

The `mockConsole` function returns an object that contains two functions to clear (reset all informations about every call) and restore (revert the original console method implementations) the `console`:

```ts
import { afterAll, afterEach } from 'vitest'
import { mockConsole } from 'vitest-console'

const { clearConsole, restoreConsole } = mockConsole()

afterEach(clearConsole)
afterAll(restoreConsole)
```

## Matchers

### toHaveErrored

Asserts that an error was logged.

```ts
import { expect, test } from 'vitest'

test('should test if an error was logged', () => {
  expect(console).toHaveErrored()
})
```

### toHaveErroredTimes

Asserts that a certain amount of errors were logged.

```ts
import { expect, test } from 'vitest'

test('should test if 3 errors were logged', () => {
  expect(console).toHaveErroredTimes(3)
})
```

### toHaveErroredWith

Asserts that an error was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if an error was logged with a specific text and number', () => {
  expect(console).toHaveErroredWith('the error message', 123)
})
```

### toHaveLastErroredWith

Asserts that errors were logged and that the last one was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if the last error was logged with a specific text and number', () => {
  expect(console).toHaveLastErroredWith('the last error message', 123)
})
```

### toHaveNthErroredWith

Asserts that errors were logged and that a specific one was logged with certain parameters.

The count starts at 1.

```ts
import { expect, test } from 'vitest'

test('should test if the second error was logged with a specific text and number', () => {
  expect(console).toHaveNthErroredWith(2, 'the second error message', 123)
})
```

### toHaveInformed

Asserts that an informational message was logged.

```ts
import { expect, test } from 'vitest'

test('should test if an informational message was logged', () => {
  expect(console).toHaveInformed()
})
```

### toHaveInformedTimes

Asserts that a certain amount of informational messages were logged.

```ts
import { expect, test } from 'vitest'

test('should test if 3 informational messages were logged', () => {
  expect(console).toHaveInformedTimes(3)
})
```

### toHaveInformedWith

Asserts that an informational message was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if an informational message was logged with a specific text and number', () => {
  expect(console).toHaveInformedWith('the informational message', 123)
})
```

### toHaveLastInformedWith

Asserts that informational messages were logged and that the last one was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if the last informational message was logged with a specific text and number', () => {
  expect(console).toHaveLastInformedWith('the last informational message', 123)
})
```

### toHaveNthInformedWith

Asserts that informational messages were logged and that a specific one was logged with certain parameters.

The count starts at 1.

```ts
import { expect, test } from 'vitest'

test('should test if the second informational message was logged with a specific text and number', () => {
  expect(console).toHaveNthInformedWith(2, 'the second informational message', 123)
})
```

### toHaveLogged

Asserts that a message was logged.

```ts
import { expect, test } from 'vitest'

test('should test if a message was logged', () => {
  expect(console).toHaveLogged()
})
```

### toHaveLoggedTimes

Asserts that a certain amount of messages were logged.

```ts
import { expect, test } from 'vitest'

test('should test if 3 messages were logged', () => {
  expect(console).toHaveLoggedTimes(3)
})
```

### toHaveLoggedWith

Asserts that a message was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if a message was logged with a specific text and number', () => {
  expect(console).toHaveLoggedWith('the message', 123)
})
```

### toHaveLastLoggedWith

Asserts that messages were logged and that the last one was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if the last message was logged with a specific text and number', () => {
  expect(console).toHaveLastLoggedWith('the last message', 123)
})
```

### toHaveNthLoggedWith

Asserts that messages were logged and that a specific one was logged with certain parameters.

The count starts at 1.

```ts
import { expect, test } from 'vitest'

test('should test if the second message was logged with a specific text and number', () => {
  expect(console).toHaveNthLoggedWith(2, 'the second message', 123)
})
```

### toHaveWarned

Asserts that a warning was logged.

```ts
import { expect, test } from 'vitest'

test('should test if a message was logged', () => {
  expect(console).toHaveWarned()
})
```

### toHaveWarnedTimes

Asserts that a certain amount of warnings were logged.

```ts
import { expect, test } from 'vitest'

test('should test if 3 warnings were logged', () => {
  expect(console).toHaveWarnedTimes(3)
})
```

### toHaveWarnedWith

Asserts that a warning was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if a warning was logged with a specific text and number', () => {
  expect(console).toHaveWarnedWith('the warning', 123)
})
```

### toHaveLastWarnedWith

Asserts that warnings were logged and that the last one was logged with certain parameters.

```ts
import { expect, test } from 'vitest'

test('should test if the last warning was logged with a specific text and number', () => {
  expect(console).toHaveLastWarnedWith('the last warning', 123)
})
```

### toHaveNthWarnedWith

Asserts that warnings were logged and that a specific one was logged with certain parameters.

The count starts at 1.

```ts
import { expect, test } from 'vitest'

test('should test if the second warning was logged with a specific text and number', () => {
  expect(console).toHaveNthWarnedWith(2, 'the second warning', 123)
})
```

## Vitest matchers

If needed, you can also use the built-in matchers from Vitest with mocks created using `vitest-console`.

```ts
import { expect, test } from 'vitest'
import { mockConsole } from 'vitest-console'

test('should test if a message was logged', () => {
  const { restoreConsole } = mockConsole()

  expect(console.log).toHaveBeenCalled()

  restoreConsole()
})
```

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/vitest-console/blob/main/LICENSE) for more information.
