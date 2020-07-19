import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ReduxState from '../redux/state'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import { closeCart } from '../redux/actions/cart.actions'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import CartItem from './CartItem'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { groupPizzas, calculatePrice } from '../utils'
import { DialogActions } from '@material-ui/core'

type CartStore = Pick<ReduxState, 'cartOpen'> & Pick<ReduxState, 'cart'>

interface CartActions {
  closeCartAction: typeof closeCart
}

type CartProps = CartStore & CartActions

const connector = (state: ReduxState): CartStore =>
  pick(state, ['cartOpen', 'cart'])

const actions: CartActions = {
  closeCartAction: closeCart,
}

const withStore = connect(connector, actions)

const Cart: React.FC<CartProps> = (props) => {
  const pizzas = groupPizzas(props.cart)
  const price = calculatePrice(props.cart)

  return (
    <Dialog open={props.cartOpen} onClose={props.closeCartAction}>
      <DialogTitle>
        <AddShoppingCartIcon />
        Cart x{props.cart.length}
      </DialogTitle>
      <DialogContent>
        <List>
          {pizzas.map((pizza, index) => (
            <CartItem key={index} {...pizza} />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={props.closeCartAction}
        >
          Close
        </Button>
        <Button variant="contained" color="primary">
          Check out €{price.toFixed(2)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStore(Cart)
