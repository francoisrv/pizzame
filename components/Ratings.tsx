import React from 'react'
import EmptyStarIcon from '@material-ui/icons/StarBorder'
import FullStarIcon from '@material-ui/icons/Star'
import HalfFullStarIcon from '@material-ui/icons/StarHalf'
import isFloat from '../utils'

interface RatingProps {
  ratings: number
  color?: string
  size?: number
}

const Ratings: React.FC<RatingProps> = (props) => {
  const stars: React.ReactElement<any>[] = []
  const { ratings } = props
  const isHalf = isFloat(ratings)

  const style = {
    color: props.color,
    fontSize: `${props.size}em`,
    textShadow: '2px 2px rgba(0, 0, 0, 0.25)',
  }

  for (let i = 0; i < (isHalf ? Math.ceil(ratings) - 1 : ratings); i++) {
    stars.push(<FullStarIcon key={i} style={style} />)
  }

  if (isHalf) {
    stars.push(<HalfFullStarIcon key={Math.ceil(ratings)} style={style} />)
    for (let i = Math.ceil(ratings) + 1; i <= 5; i++) {
      stars.push(<EmptyStarIcon key={i + 1} style={style} />)
    }
  } else {
    for (let i = Math.ceil(ratings); i < 5; i++) {
      stars.push(<EmptyStarIcon key={i} style={style} />)
    }
  }

  return <div>{stars}</div>
}

Ratings.defaultProps = {
  color: '#ffab00',
  size: 1,
}

export default Ratings
