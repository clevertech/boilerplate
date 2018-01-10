import { all, fork } from 'redux-saga/effects';

import { rootSaga as products } from './products';
import { rootSaga as authentication } from './authentication';

function* rootSaga() {
  yield all([fork(products), fork(authentication)]);
}

export default rootSaga;
