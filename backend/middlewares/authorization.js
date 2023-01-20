const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/AuthentificationError');
const { authentificationErrorMessage } = require('../errors/responseMessages');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.authorization = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    const err = new AuthentificationError(authentificationErrorMessage);
    return next(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const newErr = new AuthentificationError(authentificationErrorMessage);
    return next(newErr);
  }

  req.user = payload;

  return next();
};
