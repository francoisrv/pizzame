import { setCoords } from "../actions/map.actions";
import ReduxState from "../state";
import { ReduxActionType } from "../types";

type State = ReduxState["coords"]

type Actions =
& ReturnType<typeof setCoords>

const initialState: State = [51.5144951, -0.0824952]

export default function coordsReducer(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.SET_COORDS) {
    return action.payload.coords
  }
  return state
}
