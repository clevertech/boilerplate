import request from '../../shared/request';

export function getProductList() {
  return request('/products');
}
