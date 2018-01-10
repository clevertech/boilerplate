import history from '../../history';
import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/authentication';
import * as api from '../api/authentication';

function* login(action) {
  try {
    const payload = yield call(api.login, action);
    yield put({ type: constants.AUTHENTICATION_LOGIN.SUCCESS, payload });
    yield call(history.push, '/');
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_LOGIN.FAILED,
      message: e.message || e
    });
  }
}

function* watchLogin() {
  yield takeLatest(constants.AUTHENTICATION_LOGIN.ACTION, login);
}

function* logoutUser(action) {
  yield call(history.push, '/');
}

function* watchLogoutUser() {
  yield takeLatest(constants.AUTHENTICATION_LOGOUT, logoutUser);
}

function* getAccount(action) {
  try {
    const payload = yield call(api.getAccount, action);
    console.log(
      'This is just a test request to check that authentication works',
      payload
    );
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_GET_ACCOUNT.FAILED,
      message: e.message || e
    });
  }
}

function* watchGetAccount() {
  yield takeLatest(constants.AUTHENTICATION_GET_ACCOUNT.ACTION, getAccount);
}

/**
 * Export the root saga by forking all available sagas.
 */
export function* rootSaga() {
  yield all([fork(watchGetAccount), fork(watchLogin), fork(watchLogoutUser)]);
}
