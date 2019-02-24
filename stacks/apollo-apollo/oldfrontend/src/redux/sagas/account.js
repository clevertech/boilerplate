import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import history from '../../history';
import { constants } from '../modules/account';
import * as api from '../api/account';

export function* login(action) {
  try {
    const payload = yield call(api.login, action);
    if (!payload.authenticated) {
      yield call(history.push, '/account/login-2fa');
    } else {
      yield put({ type: constants.ACCOUNT_LOGIN.SUCCESS, payload });
      yield call(history.push, '/');
    }
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_LOGIN.FAILED,
      message: e.message || e
    });
  }
}

function* watchLogin() {
  yield takeLatest(constants.ACCOUNT_LOGIN.ACTION, login);
}

export function* loginTwoFactor(action) {
  try {
    const payload = yield call(api.loginTwoFactor, action);
    yield put({ type: constants.ACCOUNT_LOGIN_TWO_FACTOR.SUCCESS, payload });
    if (!payload.authenticated) {
      yield call(history.push, '/account/login-2fa');
    } else {
      yield call(history.push, '/');
    }
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_LOGIN_TWO_FACTOR.FAILED,
      message: e.message || e
    });
  }
}

function* watchLoginTwoFactor() {
  yield takeLatest(constants.ACCOUNT_LOGIN_TWO_FACTOR.ACTION, loginTwoFactor);
}

function* register(action) {
  try {
    const payload = yield call(api.register, action);
    yield put({ type: constants.ACCOUNT_REGISTER.SUCCESS, payload });
    yield call(history.push, '/account/register?ok');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_REGISTER.FAILED,
      message: e.message || e
    });
  }
}

function* watchRegister() {
  yield takeLatest(constants.ACCOUNT_REGISTER.ACTION, register);
}

function* logoutUser(action) {
  yield call(history.push, '/');
}

function* watchLogoutUser() {
  yield takeLatest(constants.ACCOUNT_LOGOUT, logoutUser);
}

function* getAccount(action) {
  try {
    yield call(api.getAccount, action);
    // TODO: use returned values
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_GET_ACCOUNT.FAILED,
      message: e.message || e
    });
  }
}

function* watchGetAccount() {
  yield takeLatest(constants.ACCOUNT_GET_ACCOUNT.ACTION, getAccount);
}

function* forgotPassword(action) {
  try {
    const payload = yield call(api.forgotPassword, action);
    yield put({ type: constants.ACCOUNT_FORGOT_PASSWORD.SUCCESS, payload });
    yield call(history.push, '/account/forgot-password?sent');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_FORGOT_PASSWORD.FAILED,
      message: e.message || e
    });
  }
}

function* watchForgotPassword() {
  yield takeLatest(constants.ACCOUNT_FORGOT_PASSWORD.ACTION, forgotPassword);
}

function* resetPassword(action) {
  try {
    const payload = yield call(api.resetPassword, action);
    yield put({ type: constants.ACCOUNT_RESET_PASSWORD.SUCCESS, payload });
    yield call(history.push, '/account/reset-password?reset');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_RESET_PASSWORD.FAILED,
      message: e.message || e
    });
  }
}

function* watchResetPassword() {
  yield takeLatest(constants.ACCOUNT_RESET_PASSWORD.ACTION, resetPassword);
}

function* confirmEmail(action) {
  try {
    const payload = yield call(api.confirmEmail, action);
    yield put({ type: constants.ACCOUNT_CONFIRM_EMAIL.SUCCESS, payload });
    yield call(history.push, '/account/confirm-email?ok');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_CONFIRM_EMAIL.FAILED,
      message: e.message || e
    });
  }
}

function* watchConfirmEmail() {
  yield takeLatest(constants.ACCOUNT_CONFIRM_EMAIL.ACTION, confirmEmail);
}

function* changePassword(action) {
  try {
    const payload = yield call(api.changePassword, action);
    yield put({ type: constants.ACCOUNT_CHANGE_PASSWORD.SUCCESS, payload });
    yield call(history.push, '/account/settings/change-password?ok');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_CHANGE_PASSWORD.FAILED,
      message: e.message || e
    });
  }
}

function* watchChangePassword() {
  yield takeLatest(constants.ACCOUNT_CHANGE_PASSWORD.ACTION, changePassword);
}

function* generateTwoFactorAuthenticationSMS(action) {
  try {
    const payload = yield call(api.generateTwoFactorAuthenticationSMS, action);
    yield put({ type: constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.SUCCESS, payload });
    yield call(history.push, '/account/settings/2fa/sms?confirm');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.FAILED,
      message: e.message || e
    });
  }
}

function* watchGenerateTwoFactorAuthenticationSMS() {
  yield takeLatest(
    constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.ACTION,
    generateTwoFactorAuthenticationSMS
  );
}

function* configureTwoFactorAuthenticationSMS(action) {
  try {
    const payload = yield call(api.configureTwoFactorAuthenticationSMS, action);
    yield put({ type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_SMS.SUCCESS, payload });
    yield call(history.push, '/account/settings/2fa/sms?ok');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_SMS.FAILED,
      message: e.message || e
    });
  }
}

function* watchConfigureTwoFactorAuthenticationSMS() {
  yield takeLatest(
    constants.ACCOUNT_CONFIGURE_TWO_FACTOR_SMS.ACTION,
    configureTwoFactorAuthenticationSMS
  );
}

function* generateTwoFactorAuthenticationQR(action) {
  try {
    const payload = yield call(api.generateTwoFactorAuthenticationQR, action);
    yield put({ type: constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.FAILED,
      message: e.message || e
    });
  }
}

function* watchGenerateTwoFactorAuthenticationQR() {
  yield takeLatest(
    constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.ACTION,
    generateTwoFactorAuthenticationQR
  );
}

function* configureTwoFactorAuthenticationQR(action) {
  try {
    const payload = yield call(api.configureTwoFactorAuthenticationQR, action);
    yield put({ type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_QR.SUCCESS, payload });
    yield call(history.push, '/account/settings/2fa/app?ok');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_QR.FAILED,
      message: e.message || e
    });
  }
}

function* watchConfigureTwoFactorAuthenticationQR() {
  yield takeLatest(
    constants.ACCOUNT_CONFIGURE_TWO_FACTOR_QR.ACTION,
    configureTwoFactorAuthenticationQR
  );
}

function* getTwoFactorStatus(action) {
  try {
    const payload = yield call(api.getTwoFactorAuthenticationStatus, action);
    yield put({ type: constants.ACCOUNT_GET_TWO_FACTOR_STATUS.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_GET_TWO_FACTOR_STATUS.FAILED,
      message: e.message || e
    });
  }
}

function* watchGetTwoFactorStatus() {
  yield takeLatest(constants.ACCOUNT_GET_TWO_FACTOR_STATUS.ACTION, getTwoFactorStatus);
}

function* disableTwoFactor(action) {
  try {
    const payload = yield call(api.disableTwoFactorAuthentication, action);
    yield put({ type: constants.ACCOUNT_DISABLE_TWO_FACTOR.SUCCESS, payload });
    yield call(history.push, '/account/settings/2fa?disabled');
  } catch (e) {
    yield put({
      type: constants.ACCOUNT_DISABLE_TWO_FACTOR.FAILED,
      message: e.message || e
    });
  }
}

function* watchDisableTwoFactor() {
  yield takeLatest(constants.ACCOUNT_DISABLE_TWO_FACTOR.ACTION, disableTwoFactor);
}

/**
 * Export the root saga by forking all available sagas.
 */
export function* rootSaga() {
  yield all([
    fork(watchGetAccount),
    fork(watchLogin),
    fork(watchLoginTwoFactor),
    fork(watchRegister),
    fork(watchLogoutUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchConfirmEmail),
    fork(watchChangePassword),
    fork(watchGenerateTwoFactorAuthenticationSMS),
    fork(watchConfigureTwoFactorAuthenticationSMS),
    fork(watchGenerateTwoFactorAuthenticationQR),
    fork(watchConfigureTwoFactorAuthenticationQR),
    fork(watchGetTwoFactorStatus),
    fork(watchDisableTwoFactor)
  ]);
}
