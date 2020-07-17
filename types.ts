export interface Restaurant {
  name: string
  latitude: number
  longitude: number
  ratings: number
}

export interface Menu {
  name: string
  price: number
  ingredients: string[]
  image: string
  cols: number
}
