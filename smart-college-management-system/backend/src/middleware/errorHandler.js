function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message
  });
}

module.exports = { errorHandler };

