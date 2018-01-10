import config from '../config';
import store from '../redux/store';

const { API_BASE } = config;
const { actions } = require('../redux/modules/authentication');

const getAuthorization = () => {
  const state = store.getState();
  const token = state.authentication && state.authentication.token;
  return token ? `Bearer ${token}` : void 0;
};

const isLoggedIn = () => {
  const state = store.getState();
  return !!(state.authentication && state.authentication.user);
};

const isLiteralObject = obj =>
  Object.prototype.toString.call(obj) === '[object Object]';

const jsonBody = response => {
  try {
    return response.json();
  } catch (err) {
    console.warn('The server did not send a JSON response', err);
    return {};
  }
};

const request = async (path, options) => {
  options = Object.assign({}, options, {
    headers: {
      Authorization: getAuthorization()
    }
  });
  const { body } = options;
  if (isLiteralObject(body)) {
    options.body = JSON.stringify(body);
    options.headers = Object.assign(options.headers || {}, {
      'Content-Type': 'application/json'
    });
  }
  const response = await fetch(`${API_BASE}/api${path}`, options);
  const json = await jsonBody(response);
  const createError = () =>
    new Error(json.error || response.statusText || 'Unexpected error');
  if (response.status === 401 && isLoggedIn()) {
    store.dispatch(actions.logout());
    throw new Error(createError());
  }
  if (!response.ok) {
    throw new Error(createError());
  }
  return json;
};

export default request;
