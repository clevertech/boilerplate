import request from '../../shared/request';

export function login({ username, password }) {
  return request('/users/login', {
    method: 'POST',
    body: { username, password }
  });
}

export function getAccount() {
  return request('/users/account');
}
