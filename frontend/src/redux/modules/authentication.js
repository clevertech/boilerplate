import { createSagaAction } from '../../shared/sagas';
import { createReducer } from '../../shared/reducers';

// Constants
export const constants = {
  AUTHENTICATION_GET_ACCOUNT: createSagaAction('AUTHENTICATION_GET_ACCOUNT'),
  AUTHENTICATION_LOGIN: createSagaAction('AUTHENTICATION_LOGIN'),
  AUTHENTICATION_LOGOUT: 'AUTHENTICATION_LOGOUT'
};

// Action Creators
export const actions = {
  login: ({ username, password }) => ({
    type: constants.AUTHENTICATION_LOGIN.ACTION,
    username,
    password
  }),
  logout: () => ({
    type: constants.AUTHENTICATION_LOGOUT
  }),
  getAccount: () => ({
    type: constants.AUTHENTICATION_GET_ACCOUNT.ACTION
  })
};

// Reducer
const initialState = {};

export default createReducer(initialState, (state, action) => {
  switch (action.type) {
    case constants.AUTHENTICATION_LOGIN.ACTION:
      return { ...state, error: null, loggingIn: true };
    case constants.AUTHENTICATION_LOGIN.SUCCESS:
      return action.payload;
    case constants.AUTHENTICATION_LOGIN.FAILED:
      return {
        error: action.message
      };
    case constants.AUTHENTICATION_LOGOUT:
      return initialState;
    default:
      return state;
  }
});
