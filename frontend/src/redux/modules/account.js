import { createSagaAction } from '../../shared/sagas';
import { createReducer } from '../../shared/reducers';

// Constants
export const constants = {
  ACCOUNT_GET_ACCOUNT: createSagaAction('ACCOUNT_GET_ACCOUNT'),
  ACCOUNT_LOGIN: createSagaAction('ACCOUNT_LOGIN'),
  ACCOUNT_LOGIN_TWO_FACTOR: createSagaAction('ACCOUNT_LOGIN_TWO_FACTOR'),
  ACCOUNT_REGISTER: createSagaAction('ACCOUNT_REGISTER'),
  ACCOUNT_LOGOUT: 'ACCOUNT_LOGOUT',
  ACCOUNT_FORGOT_PASSWORD: createSagaAction('ACCOUNT_FORGOT_PASSWORD'),
  ACCOUNT_RESET_PASSWORD: createSagaAction('ACCOUNT_RESET_PASSWORD'),
  ACCOUNT_CONFIRM_EMAIL: createSagaAction('ACCOUNT_CONFIRM_EMAIL'),

  // settings
  ACCOUNT_CHANGE_PASSWORD: createSagaAction('ACCOUNT_CHANGE_PASSWORD'),
  ACCOUNT_GENERATE_TWO_FACTOR_QR: createSagaAction('ACCOUNT_GENERATE_TWO_FACTOR_QR'),
  ACCOUNT_CONFIGURE_TWO_FACTOR_QR: createSagaAction('ACCOUNT_CONFIGURE_TWO_FACTOR_QR'),
  ACCOUNT_GENERATE_TWO_FACTOR_SMS: createSagaAction('ACCOUNT_GENERATE_TWO_FACTOR_SMS'),
  ACCOUNT_CONFIGURE_TWO_FACTOR_SMS: createSagaAction('ACCOUNT_CONFIGURE_TWO_FACTOR_SMS'),
  ACCOUNT_GET_TWO_FACTOR_STATUS: createSagaAction('ACCOUNT_GET_TWO_FACTOR_STATUS'),
  ACCOUNT_DISABLE_TWO_FACTOR: createSagaAction('ACCOUNT_DISABLE_TWO_FACTOR')
};

// Action Creators
export const actions = {
  login: ({ email, password }) => ({
    type: constants.ACCOUNT_LOGIN.ACTION,
    email,
    password
  }),
  loginTwoFactor: ({ jwt, token }) => ({
    type: constants.ACCOUNT_LOGIN_TWO_FACTOR.ACTION,
    jwt,
    token
  }),
  register: ({ username, firstName, lastName, email, password }) => ({
    type: constants.ACCOUNT_REGISTER.ACTION,
    username,
    firstName,
    lastName,
    email,
    password
  }),
  forgotPassword: ({ email }) => ({
    type: constants.ACCOUNT_FORGOT_PASSWORD.ACTION,
    email
  }),
  resetPassword: ({ token, password }) => ({
    type: constants.ACCOUNT_RESET_PASSWORD.ACTION,
    token,
    password
  }),
  logout: () => ({
    type: constants.ACCOUNT_LOGOUT
  }),
  getAccount: () => ({
    type: constants.ACCOUNT_GET_ACCOUNT.ACTION
  }),
  confirmEmail: ({ token }) => ({
    type: constants.ACCOUNT_CONFIRM_EMAIL.ACTION,
    token
  }),
  changePassword: ({ oldPassword, newPassword }) => ({
    type: constants.ACCOUNT_CHANGE_PASSWORD.ACTION,
    oldPassword,
    newPassword
  }),
  generateTwoFactorQR: () => ({
    type: constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.ACTION
  }),
  configureTwoFactorQR: ({ token, secret }) => ({
    type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_QR.ACTION,
    token,
    secret
  }),
  generateTwoFactorSMS: ({ phoneNumber }) => ({
    type: constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.ACTION,
    phoneNumber
  }),
  configureTwoFactorSMS: ({ token, secret }) => ({
    type: constants.ACCOUNT_CONFIGURE_TWO_FACTOR_SMS.ACTION,
    token,
    secret
  }),
  disableTwoFactor: ({ password }) => ({
    type: constants.ACCOUNT_DISABLE_TWO_FACTOR.ACTION,
    password
  }),
  getTwoFactorStatus: () => ({
    type: constants.ACCOUNT_GET_TWO_FACTOR_STATUS.ACTION
  })
};

// Selectors
export const accountInfo = (state, cfg) => {
  return {
    loggedIn: !!state.user,
    loggingIn: state.loggingIn,
    ...state,
    ...cfg
  };
};

// Reducer
const initialState = {};

// eslint-disable-next-line complexity
export default createReducer(initialState, (state, action) => {
  switch (action.type) {
    case constants.ACCOUNT_LOGIN.ACTION:
      return { ...state, loggingIn: true };
    case constants.ACCOUNT_LOGIN.SUCCESS:
      if (!action.payload.authenticated) {
        return { twoFactor: action.payload };
      }
      return action.payload;
    case constants.ACCOUNT_LOGIN_TWO_FACTOR.SUCCESS:
    case constants.ACCOUNT_REGISTER.SUCCESS:
      return action.payload;
    case constants.ACCOUNT_LOGOUT:
      return initialState;
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.ACTION:
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.FAILED:
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.ACTION:
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.FAILED:
      return { ...state, twoFactor: null };
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_QR.SUCCESS:
    case constants.ACCOUNT_GENERATE_TWO_FACTOR_SMS.SUCCESS:
      return { ...state, twoFactor: action.payload };
    case constants.ACCOUNT_CONFIGURE_TWO_FACTOR_QR.SUCCESS:
    case constants.ACCOUNT_CONFIGURE_TWO_FACTOR_SMS.SUCCESS:
      return { ...state, codes: action.payload.codes };
    case constants.ACCOUNT_GET_TWO_FACTOR_STATUS.SUCCESS:
      return { ...state, twoFactorStatus: action.payload };
    case constants.ACCOUNT_DISABLE_TWO_FACTOR.SUCCESS:
      return { ...state, twoFactorStatus: {} };
    default:
      return state;
  }
});
