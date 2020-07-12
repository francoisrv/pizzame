import { ReduxActionType } from "../types";
import { Restaurant } from "../../types";

export function selectRestaurant(restaurant: Restaurant) {
  return {
    type: ReduxActionType.SELECT_RESTAURANT as ReduxActionType.SELECT_RESTAURANT,
    payload: { restaurant }
  }
}
