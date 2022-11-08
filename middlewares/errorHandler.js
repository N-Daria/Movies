const { OtherError } = require('../errors/OtherError');

module.exports.errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  const otherErr = new OtherError('На сервере произошла ошибка');
  res.status(otherErr.statusCode).send({ message: otherErr.message });

  return next();
};
