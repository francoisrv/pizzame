import { Restaurant, Menu } from "../types";

interface ReduxState {
  coords: [number, number]
  mapHeight: number
  previewedRestaurant: Restaurant | null
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  menu: Menu[]
}

export default ReduxState
