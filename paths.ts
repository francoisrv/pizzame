export function urlMatchesPattern(url: string, pattern: string): boolean {
  const urlBits: string[] = url.split(/\//)
  const patternBits: string[] = pattern.split(/\//)
  const bits = urlBits.map((urlBit, index) => {
    if (/^:/.test(patternBits[index])) {
      return true
    }
    return urlBit === patternBits[index]
  })
  return bits.every(Boolean)
}

export function applyUrlPatterns(url: string, patterns: { [name: string]: any }): string {
  return url
    .split(/\//)
    .map(bit => {
      if (/^:/.test(bit)) {
        const param = bit.replace(/^:/, '')
        if (param in patterns) {
          return patterns[param]
        }
        throw new Error(`Missing parameter ${ param }`)
      }
      return bit
    })
    .join('/')
}

export function getPatternValue(url: string, pattern: string, param: string): string {
  const urlBits = url.split(/\//)
  const patternBits = pattern.split(/\//)
  const index = patternBits.indexOf(`:${ param }`)
  if (index === -1) {
    throw new Error(`Parameter not found: ${ param }`)
  }
  return urlBits[index]
}

export const RESTAURANT_PATH = '/restaurants/:restaurantName'