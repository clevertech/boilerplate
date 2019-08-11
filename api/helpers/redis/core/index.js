// RedisCore Helper -- a singleton client with a set of async utils
import redis from 'redis'
import {promisify} from 'util'
import RedisCoreError from './RedisCoreError'
const redisCore = {}

// async wrapper around createClient for consistency
redisCore.connect = async function redisCoreConnect() {
  if (redisCore.client) return redisCore.client
  return redisCore.client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    retry_strategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new RedisCoreError('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new RedisCoreError('Retry time exhausted');
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  })
}

// cleanly disconnect the redis client
redisCore.disconnect = async function redisCoreDisconnect() {
  if (!redisCore.client) redisCore.connect()
  redisCore.client.quit()
  delete redisCore.client
  return true
}

// hash set async wrapper
redisCore.hmset = function redisCoreHmset(hash, hashObject) {
  if (!redisCore.client) redisCore.connect()
  return new Promise((resolve,reject) => {
    redisCore.client.hmset(hash, hashObject, function redisCoreClientHmsetCallback(err, obj) {
      if (err) return reject(err)
      return resolve(obj)
    })
  })
}

// hash getall async wrapper
redisCore.hmgetall = function redisCoreHmgetall(hash, hashObject) {
  if (!redisCore.client) redisCore.connect()
  return new Promise((resolve,reject) => {
    redisCore.client.hmgetall(hash, function redisCoreClientHmgetallCallback(err, obj) {
      if (err) return reject(err)
      return resolve(obj)
    })
  })
}

// hash get async wrapper
redisCore.hmget = function redisCoreHmget(hash, hashObject) {
  if (!redisCore.client) redisCore.connect()
  return new Promise((resolve,reject) => {
    redisCore.client.hmget(hash, hashObject, function redisCoreClientHmgetCallback(err, obj) {
      if (err) return reject(err)
      return resolve(obj)
    })
  })
}

export default redisCore