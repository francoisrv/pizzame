import { Dictionary } from 'lodash'
import { applyUrlPatterns } from '../../paths'
import { ReduxActionType } from '../types'

interface GoToOptions {
  params?: Dictionary<string>
}

export function goToAction(link: string, options: GoToOptions = {}) {
  return {
    type: ReduxActionType.GO_TO as ReduxActionType.GO_TO,
    payload: {
      link: applyUrlPatterns(link, options.params)
    }
  }
}
