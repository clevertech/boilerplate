/**
 * Use these errors in your business logic to have proper status codes
 * in the HTTP responses
 */

class BadRequest extends Error {
  get httpStatusCode() {
    return 400;
  }
}

class Unauthorized extends Error {
  get httpStatusCode() {
    return 401;
  }
}

class Forbidden extends Error {
  get httpStatusCode() {
    return 403;
  }
}

class NotFound extends Error {
  get httpStatusCode() {
    return 404;
  }
}

const asyncMiddleware = middleware => {
  const wrap = async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrap;
};

const apiErrorHandler = (err, req, res, next) => {
  const statusCode = err.httpStatusCode || 500;
  res.status(statusCode).json({ error: err.message || String(err) });
};

module.exports = {
  apiErrorHandler,
  asyncMiddleware,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound
};
