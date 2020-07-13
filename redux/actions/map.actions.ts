import ReduxState from "../state";
import { ReduxActionType } from "../types";

export function setCoords(coords: ReduxState["coords"]) {
  return {
    type: ReduxActionType.SET_COORDS as ReduxActionType.SET_COORDS,
    payload: { coords }
  }
}

export function setMapHeight(mapHeight: ReduxState["mapHeight"]) {
  return {
    type: ReduxActionType.SET_MAP_HEIGHT as ReduxActionType.SET_MAP_HEIGHT,
    payload: { mapHeight }
  }
}
