import { createSagaAction } from '../../shared/sagas';
import { createReducer } from '../../shared/reducers';

// Constants
export const constants = {
  PRODUCTS_REFRESH: createSagaAction('PRODUCTS_REFRESH')
};

// Action Creators
export const actions = {
  productsRefresh: () => ({ type: constants.PRODUCTS_REFRESH.ACTION })
};

// Reducer
const initialState = {
  records: [],
  total: 0
};

export default createReducer(initialState, (state, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case constants.PRODUCTS_REFRESH.SUCCESS:
      return { ...state, records: payload.records, total: payload.total };
  }
});
