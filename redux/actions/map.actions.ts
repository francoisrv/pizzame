import ReduxState from "../state";
import { ReduxActionType } from "../types";

export function setCoords(coords: ReduxState["coords"]) {
  return {
    type: ReduxActionType.SET_COORDS as ReduxActionType.SET_COORDS,
    payload: { coords }
  }
}