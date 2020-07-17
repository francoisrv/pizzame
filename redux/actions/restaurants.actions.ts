import { ReduxActionType } from "../types";
import { Restaurant } from "../../types";

export function selectRestaurant(restaurant: Restaurant) {
  return {
    type: ReduxActionType.SELECT_RESTAURANT as ReduxActionType.SELECT_RESTAURANT,
    payload: { restaurant }
  }
}

export function previewRestaurant(restaurant: Restaurant) {
  return {
    type: ReduxActionType.PREVIEW_RESTAURANT as ReduxActionType.PREVIEW_RESTAURANT,
    payload: { restaurant }
  }
}

export function resetPreviewRestaurant() {
  return {
    type: ReduxActionType.RESET_PREVIEW_RESTAURANT as ReduxActionType.RESET_PREVIEW_RESTAURANT
  }
}

export function resetSelectRestaurant() {
  return {
    type: ReduxActionType.RESET_SELECT_RESTAURANT as ReduxActionType.RESET_SELECT_RESTAURANT
  }
}

export function selectRestaurantBySlug(slug: string) {
  return {
    type: ReduxActionType.SELECT_RESTAURANT_BY_SLUG as ReduxActionType.SELECT_RESTAURANT_BY_SLUG,
    payload: { slug }
  }
}
