import { connectRouter } from 'connected-react-router'
import config from '../../config'

export const router = connectRouter(config.history)

export default router
