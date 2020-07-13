import { createLogger } from 'redux-logger'
import { compact } from 'lodash'
import sagaMiddleware from '../sagas/middleware'
import { routerMiddleware } from 'connected-react-router'
import config from '../config'

/**
 * Redux middlewares
 */
const middlewares = [
  // Redux logger middleware
  process.env.NODE_ENV === 'development' && createLogger({
    collapsed: true,
    diff: true
  }),

  // Redux saga
  sagaMiddleware,

  // Router
  routerMiddleware(config.history)
]

export default compact(middlewares)
