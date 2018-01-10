import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/products';
import * as api from '../api/products';

function* fetchProducts(action) {
  try {
    const payload = yield call(api.getProductList, action);
    yield put({ type: constants.PRODUCTS_REFRESH.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.PRODUCTS_REFRESH.FAILED,
      message: e.message || e
    });
  }
}

/**
 * Saga
 */
function* productsRefresh() {
  yield takeLatest(constants.PRODUCTS_REFRESH.ACTION, fetchProducts);
}

/**
 * Export the root saga by forking all available sagas.
 */
export function* rootSaga() {
  // add more sagas here
  yield all([fork(productsRefresh)]);
}
