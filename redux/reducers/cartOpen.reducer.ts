import ReduxState from "../state";
import { openCart, closeCart } from "../actions/cart.actions";
import { ReduxActionType } from "../types";

type State = ReduxState["cartOpen"]

type Actions =
| ReturnType<typeof openCart>
| ReturnType<typeof closeCart>

const initialState: State = false

export default function cartOpenReducer(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.OPEN_CART) {
    return true
  }
  if (action.type === ReduxActionType.CLOSE_CART) {
    return false
  }
  return state
}
