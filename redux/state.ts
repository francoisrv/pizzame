import { Restaurant } from "../types";

interface ReduxState {
  selectedRestaurant: Restaurant | null
  restaurants: Restaurant[]
}

export default ReduxState
