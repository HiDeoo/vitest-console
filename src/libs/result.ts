export function getResult(pass: boolean, message: string): Result {
  return {
    message: () => message,
    pass,
  }
}

export function getResultWithDiff(pass: boolean, message: string, diff: string): Result {
  return {
    message: () => {
      if (!diff) {
        return message
      }

      return `${message}
  ${diff}`
    },
    pass,
  }
}

export interface Result {
  message: () => string
  pass: boolean
}
