export const DEFAULT_CONSOLE_METHODS: ConsoleMethods = ['error', 'info', 'log', 'warn']

export type ConsoleMethod = Methods<Console>
export type ConsoleMethods = ConsoleMethod[]

type Method = (...args: any[]) => unknown
type Methods<TObject> = { [TKey in keyof TObject]: TObject[TKey] extends Method ? TKey : never }[keyof TObject]
