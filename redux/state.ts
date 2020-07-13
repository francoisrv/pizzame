import { Restaurant } from "../types";

interface ReduxState {
  coords: [number, number]
  mapHeight: number
  previewedRestaurant: Restaurant | null
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
}

export default ReduxState
