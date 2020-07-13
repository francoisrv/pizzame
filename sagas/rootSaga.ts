import { all } from 'redux-saga/effects'
import restaurantsSagas from './restaurantSagas'
import routerSagas from './router.sagas'

export default function* rootSaga() {
  yield all([
    restaurantsSagas(),
    routerSagas()
  ])
}