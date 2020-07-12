import { createLogger } from 'redux-logger'
import { compact } from 'lodash'

/**
 * Redux middlewares
 */
const middlewares = [
  // Redux logger middleware
  process.env.NODE_ENV === 'development' && createLogger({
    collapsed: true,
    diff: true
  }),
]

export default compact(middlewares)
