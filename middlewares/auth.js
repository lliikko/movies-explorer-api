const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized');

module.exports = function (req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;

  next();
  return null;
};
