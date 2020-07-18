import { Menu } from '../../types'
import { ReduxActionType } from '../types'

export function addToCart(pizza: Menu) {
  return {
    type: ReduxActionType.ADD_TO_CART as ReduxActionType.ADD_TO_CART,
    payload: { pizza }
  }
}
