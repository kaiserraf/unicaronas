// backend/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.message);

  const status  = err.status  || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({ success: false, error: message });
};

module.exports = errorHandler;
