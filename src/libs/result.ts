import { type MatcherState } from '../matchers'

export function getResult(pass: boolean, message: string): Result {
  return {
    message: () => message,
    pass,
  }
}

export function getResultWithArgs(
  utils: MatcherState['utils'],
  pass: boolean,
  message: string,
  expectedArgs: unknown[],
  calls: unknown[][]
): Result {
  const diffs = calls.map((call) => utils.diff(expectedArgs, call))
  const isEmptyDiff = diffs.join('').length === 0

  let resultMessage = `${message} ${formatArgs(utils, expectedArgs)}`

  if (!isEmptyDiff) {
    resultMessage = `${resultMessage} but received:

${diffs.map((diff, callIndex) => `Call #${callIndex + 1}:\n\n${diff}`).join('\n')}`
  }

  return {
    message: () => resultMessage,
    pass,
  }
}

function formatArgs(utils: MatcherState['utils'], args: unknown[]) {
  return utils
    .stringify(args)
    .replace(/ {2}|Array /g, '')
    .replace(/\n/g, ' ')
    .replace(/, ]+/, ' ]')
}

export interface Result {
  message: () => string
  pass: boolean
}
