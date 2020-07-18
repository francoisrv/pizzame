import ReduxState from '../state'
import { addToCart } from '../actions/cart.actions'
import { ReduxActionType } from '../types'

type State = ReduxState["cart"]

type Actions =
| ReturnType<typeof addToCart>

const initialState: State = []

export default function cartReducer(state: State = initialState, action: Actions) {
  if (action.type === ReduxActionType.ADD_TO_CART) {
    return [...state, action.payload.pizza]
  }
  return state
}
