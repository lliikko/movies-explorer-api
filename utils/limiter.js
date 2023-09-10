const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'С вашего IP-адреса поступило слишком много запросов',
});

module.exports = limiter;
