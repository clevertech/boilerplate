import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer } from 'react-router-redux';
import throttle from 'lodash/throttle';
import history from '../history';
import { constants as errorConstants } from './modules/errors';

import reducers from './modules';
import rootSaga from './sagas';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    console.error('Error storing redux state in localStorage', err);
  }
};

// Initialize the Redux set up
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  loadState(),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// Run the saga now
sagaMiddleware.run(rootSaga);

history.listen((location, action) => {
  if (action === 'PUSH') {
    store.dispatch({ type: errorConstants.ERRORS_CLEANUP });
  }
});

export default store;
