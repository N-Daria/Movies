require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.authorization = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    const err = new AuthentificationError('Необходима авторизация');
    return next(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const newErr = new AuthentificationError('Необходима авторизация');
    return next(newErr);
  }

  req.user = payload;

  return next();
};
