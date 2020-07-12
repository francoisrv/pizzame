import ReduxState from "../state";
import incrementAction from "../actions/increment.action";
import { ReduxActionType } from "../types";

type State = ReduxState['counter']

type Actions =
| ReturnType<typeof incrementAction>

const initialState: State = 0

export default function counterReducer(state: State = initialState, action: Actions): State {
  if (action.type === ReduxActionType.INCREMENT) {
    return state + 1
  }
  return state
}
