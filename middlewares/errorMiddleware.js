module.exports = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ status: 'fail', message: 'Validation error', errors });
  }

  // Mongoose duplicate key error (if any)
  if (err.code && err.code === 11000) {
    return res.status(400).json({ status: 'fail', message: 'Duplicate field value', error: err.keyValue });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};
