import React from 'react'
import { Menu } from '../types'
import Typography from '@material-ui/core/Typography'

interface PizzaProps extends Menu {

}

const Pizza: React.FC<PizzaProps> = props => (
  <div>
    <Typography>
      { props.name }
    </Typography>
    {
      props.image && <img src={ props.image } style={{ width: '100%', height: 100 }} />
    }
  </div>
)

export default Pizza
