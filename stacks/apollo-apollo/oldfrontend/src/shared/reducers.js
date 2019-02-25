/**
 * Creates a reducer by either returning a new state, or by returning the current state.
 *
 * Used by the individual reducers per module.
 */
export const createReducer = (initialState, reducer) => (state = initialState, action) =>
  reducer(state, action) || state;
