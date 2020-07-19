import { Menu, PizzaCart } from "./types";
import { find } from "lodash";

export default function isFloat(n: number) {
  return n === +n && n !== (n|0)
}

export function groupPizzas(cart: Menu[]): PizzaCart[] {
  const pizzas = []
  for (const item of cart) {
    const pizza = find(pizzas, { name: item.name })
    if (pizza) {
      pizza.quantity = pizza.quantity + 1
    } else {
      pizzas.push({ ...item, quantity: 1 })
    }
  }
  return pizzas
}

export function calculatePrice(cart: Menu[]): number {
  let price = 0
  for (const item of cart) {
    price += item.price
  }
  return price
}
