import { previewRestaurant, resetPreviewRestaurant } from "../actions/restaurants.actions";
import ReduxState from "../state";
import { ReduxActionType } from "../types";

type State = ReduxState["previewedRestaurant"]

type Actions =
| ReturnType<typeof previewRestaurant>
| ReturnType<typeof resetPreviewRestaurant>

const initialState: State = null

export default function previewedRestaurantReducer(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.PREVIEW_RESTAURANT) {
    return action.payload.restaurant
  }
  if (action.type === ReduxActionType.RESET_PREVIEW_RESTAURANT) {
    return initialState
  }
  return state
}
