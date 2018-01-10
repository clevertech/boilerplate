/* global Raven */
const SENTRY_URL = '';

const envs = {
  local: {
    ENV: 'local',
    API_BASE: 'http://local.cleverbuild.biz:8080'
  },
  dev: {
    ENV: 'development',
    SENTRY_URL
  },
  stage: {
    ENV: 'staging',
    SENTRY_URL
  },
  prod: {
    ENV: 'production',
    API_BASE: 'http://example.com',
    SENTRY_URL
  }
};

// Expected hosts:
// local  :      local.cleverbuild.biz
// dev    :   dev-<random>.example.com
// staging: stage-<random>.example.com
// prod   :                example.com

const localHostnames = ['local.cleverbuild.biz', 'localhost', '127.0.0.1'];

const calculateConfig = () => {
  const { host, hostname, protocol } = window.location;
  if (localHostnames.indexOf(hostname) >= 0) {
    return envs['local'];
  }
  const hostnameParts = hostname.split('.');
  if (hostnameParts.length === 2) {
    return envs['prod'];
  }
  const subdomain = hostnameParts[0];
  const env = subdomain.split('-')[0];
  const config = envs[env];
  config.API_BASE = `${protocol}//api-${host}`;
  return config;
};

const config = calculateConfig();
if (config.SENTRY_URL) {
  Raven.config(config.SENTRY_URL).install();
  Raven.setTagsContext({ environment: config.ENV });
}
export default calculateConfig();
