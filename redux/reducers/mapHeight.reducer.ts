import { setMapHeight } from "../actions/map.actions";
import ReduxState from "../state";
import { ReduxActionType } from "../types";

type State = ReduxState["mapHeight"]

type Actions =
& ReturnType<typeof setMapHeight>

const initialState: State = 100

export default function mapHeightReducer(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.SET_MAP_HEIGHT) {
    return action.payload.mapHeight
  }
  return state
}