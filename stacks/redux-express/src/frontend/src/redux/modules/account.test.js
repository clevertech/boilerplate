import reducer, { actions } from './actions';

describe('Account reducer', () => {
  test('login action', () => {
    const action = actions.login('user@example.com', 'foobarbaz');
    const state = reducer({}, action);
    expect(state).toEqual({ loggingIn: true });
  });

  test('logout action', () => {
    const action = actions.logout();
    const state = reducer({}, action);
    expect(state).toEqual({});
  });
});
