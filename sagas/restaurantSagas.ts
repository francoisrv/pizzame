import { find, kebabCase, startCase } from 'lodash'
import { takeLatest, put, select, call } from 'redux-saga/effects'
import Geopoint from 'geo-point'
import { RESTAURANT_PATH } from '../paths'
import { setCoords, setMapHeight } from '../redux/actions/map.actions'
import { selectRestaurant, selectRestaurantBySlug, resetPreviewRestaurant } from '../redux/actions/restaurants.actions'
import { goToAction } from '../redux/actions/router.actions'
import { ReduxActionType } from '../redux/types'
import GeoPoint from 'geo-point'

function* selectRestaurantSaga(action: ReturnType<typeof selectRestaurant>) {
  yield put(goToAction(RESTAURANT_PATH, { params: { restaurantName: kebabCase(action.payload.restaurant.name) } }))
}

function* selectRestaurantBySlugSaga(action: ReturnType<typeof selectRestaurantBySlug>) {
  const { slug } = action.payload
  const name = startCase(slug)
  const restaurants = yield select(state => state.restaurants)
  const restaurant = find(restaurants, { name })
  if (restaurant) {
    yield put(selectRestaurant(restaurant))
  }
}

export default function* restaurantsSagas() {
  yield takeLatest(ReduxActionType.SELECT_RESTAURANT, selectRestaurantSaga)
  yield takeLatest(ReduxActionType.SELECT_RESTAURANT_BY_SLUG, selectRestaurantBySlugSaga)
}
