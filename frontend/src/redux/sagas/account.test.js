import { call, put } from 'redux-saga/effects';
import history from '../../history';
import { actions, constants } from './actions';
import * as api from './api';
import { login, loginTwoFactor } from './sagas';

describe('Account sagas', () => {
  test('login action', () => {
    const action = actions.login({ email: 'user@example.com', password: 'foobarbaz' });
    const gen = login(action);
    expect(gen.next().value).toEqual(
      call(api.login, {
        email: 'user@example.com',
        password: 'foobarbaz',
        type: constants.ACCOUNT_LOGIN.ACTION
      })
    );
    const payload = { authenticated: false };
    expect(gen.next({ payload }).value).toEqual(call(history.push, '/account/login-2fa'));
    expect(gen.next().value).toBe(undefined);
  });

  test('login 2FA action', () => {
    const action = actions.loginTwoFactor({ jwt: '111', token: '222' });
    const gen = loginTwoFactor(action);
    expect(gen.next().value).toEqual(
      call(api.loginTwoFactor, {
        jwt: '111',
        token: '222',
        type: constants.ACCOUNT_LOGIN_TWO_FACTOR.ACTION
      })
    );
    const payload = { authenticated: true };
    expect(gen.next(payload).value).toEqual(
      put({ type: constants.ACCOUNT_LOGIN_TWO_FACTOR.SUCCESS, payload })
    );
    expect(gen.next().value).toEqual(call(history.push, '/'));
    expect(gen.next().value).toBe(undefined);
  });
});
