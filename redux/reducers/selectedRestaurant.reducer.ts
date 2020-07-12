import ReduxState from "../state";
import { selectRestaurant } from "../actions/restaurants.actions";
import { ReduxActionType } from "../types";

type State = ReduxState["selectedRestaurant"]

type Actions =
& ReturnType<typeof selectRestaurant>

const initialState: State = null

export default function selectedRestaurant(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.SELECT_RESTAURANT) {
    return action.payload.restaurant
  }
  return state
}
