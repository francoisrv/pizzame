import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Menu, PizzaCart } from '../types'
import Divider from '@material-ui/core/Divider'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PlusIcon from '@material-ui/icons/Add'
import MinusIcon from '@material-ui/icons/Remove'
import { addToCart, removeFromCart } from '../redux/actions/cart.actions'
import { connect } from 'react-redux'
import { omit } from 'lodash'

interface CartItemActions {
  addToCartAction: typeof addToCart
  removeFromCartAction: typeof removeFromCart
}

type CartItemProps = PizzaCart & CartItemActions

const actions: CartItemActions = {
  addToCartAction: addToCart,
  removeFromCartAction: removeFromCart,
}

const withStore = connect(null, actions)

const CartItem: React.FC<CartItemProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  let price = `€${props.price}`
  if (props.quantity > 1) {
    price += ` x ${props.quantity} = €${(props.price * props.quantity).toFixed(
      2
    )}`
  }
  const onChangeQuality = (qty: number) => {
    const pizza = omit(props, ['addToCartActions']) as Menu
    if (qty > props.quantity) {
      props.addToCartAction(pizza)
    } else {
      props.removeFromCartAction(pizza)
    }
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.name} secondary={price} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List>
          {props.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
        <div>
          <TextField
            variant="outlined"
            value={props.quantity}
            type="number"
            onChange={(e) => onChangeQuality(Number(e.target.value))}
            label="Quantity"
          />
        </div>
      </Collapse>
      <Divider />
    </>
  )
}

export default withStore(CartItem)
