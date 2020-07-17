import ReduxState from "../state";

import menu from '../../menu.json'

type State = ReduxState["menu"]

const initialState: State = menu

export default function menuReducer(state: State = initialState): State {
  return state
}
