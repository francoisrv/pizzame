import React from 'react'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import ReduxState from '../redux/state'
import PizzaIngredients from './PizzaIngredients'
import { Menu } from '../types'
import { menuSurface, menuListWrapper } from '../styles/surfaces'

type MenuViewStore = Pick<ReduxState, 'menu'>

type MenuViewProps = MenuViewStore

const connector = (state: ReduxState): MenuViewStore => pick(state, ['menu'])

const withStore = connect(connector)

const MenuView: React.FC<MenuViewProps> = (props) => {
  const [selectedPizza, setSelectedPizza] = React.useState<Menu | null>(null)

  return (
    <div className={menuSurface}>
      <Typography variant="h3">Menu</Typography>
      <div className={menuListWrapper}>
        <GridList cellHeight={210} cols={3} spacing={4}>
          {props.menu.map((pizza) => (
            <GridListTile
              key={pizza.name}
              cols={pizza.cols}
              rows={pizza.rows}
              onClick={() => {
                setSelectedPizza(pizza)
              }}
            >
              <img src={pizza.image} />
              <GridListTileBar
                title={pizza.name}
                subtitle={`€${pizza.price}`}
                actionIcon={
                  <IconButton>
                    <AddShoppingCartIcon style={{ color: 'white' }} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <PizzaIngredients
        open={Boolean(selectedPizza)}
        pizza={selectedPizza}
        onClose={() => setSelectedPizza(null)}
      />
    </div>
  )
}

export default withStore(MenuView)
