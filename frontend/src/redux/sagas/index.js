import { all, fork } from 'redux-saga/effects';

import { rootSaga as products } from './products';
import { rootSaga as account } from './account';

function* rootSaga() {
  yield all([fork(products), fork(account)]);
}

export default rootSaga;
