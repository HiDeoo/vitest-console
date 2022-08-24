export const DEFAULT_CONSOLE_METHODS: ConsoleMethods = ['error', 'info', 'log', 'warn']

export type ConsoleMethods = Methods<Console>[]

type Method = (...args: any[]) => unknown
type Methods<TObject> = { [TKey in keyof TObject]: TObject[TKey] extends Method ? TKey : never }[keyof TObject]
