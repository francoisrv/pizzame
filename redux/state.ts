import { Restaurant } from "../types";

interface ReduxState {
  selectedRestaurant: Restaurant | null
  restaurants: Restaurant[]
  coords: [number, number]
}

export default ReduxState
