import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer } from 'react-router-redux';
import throttle from 'lodash/throttle';

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

const saveState = ({ authentication }) => {
  try {
    localStorage.setItem('state', JSON.stringify({ authentication }));
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

export default store;
