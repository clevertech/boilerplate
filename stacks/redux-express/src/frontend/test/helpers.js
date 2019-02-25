import nock from 'nock';
import config from '../src/config';

module.exports.nockBeforeEach = () => {
  const { API_BASE } = config;

  nock(API_BASE)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'Authorization'
    })
    .options(/api\/.*$/)
    .reply((uri, requestBody) => {
      return [
        200,
        'EMPTY BODY',
        { Allow: 'OPTIONS, GET, HEAD, POST' } // optional headers
      ];
    });
};

module.exports.nockAfterEach = () => {
  nock.cleanAll();
  nock.enableNetConnect();
};
