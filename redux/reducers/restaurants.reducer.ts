import ReduxState from "../state";
import restaurants from '../../restaurants.json'

type State = ReduxState["restaurants"]

const initialState: State = restaurants

export default function restaurantsReducer(state: State = initialState): State {
  return state
}
