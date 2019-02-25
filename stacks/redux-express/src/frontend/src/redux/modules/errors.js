import { createReducer } from '../../shared/reducers';

// Constants
export const constants = {
  ERRORS_CLEANUP: 'ERRORS_CLEANUP'
};

// Reducer
const initialState = {
  errors: []
};

export default createReducer(initialState, (state, action) => {
  if (action.type.endsWith('.FAILED')) {
    return {
      ...state,
      errors: [action.message]
    };
  }
  switch (action.type) {
    case constants.ERRORS_CLEANUP:
      return initialState;
    default:
      return state;
  }
});
