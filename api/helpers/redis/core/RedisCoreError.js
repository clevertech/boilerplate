import AppError from '../../../errors/AppError'

export default class RedisCoreError extends AppError {
  constructor (emssage) {
    super(message || 'An error occurred while trying to interface with redis.  See stacktrace for more details.')
  }
}