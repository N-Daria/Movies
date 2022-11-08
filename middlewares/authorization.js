require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.authorization = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    const err = new Error('Необходима авторизация');
    console.log(err);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log(err);
    const error = new Error('Необходима авторизация');
    return next(error);
  }

  req.user = payload;

  return next();
};
