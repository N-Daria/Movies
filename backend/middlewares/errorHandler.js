const { OtherError } = require('../errors/OtherError');
const { serverErrorMessage } = require('../errors/responseMessages');

module.exports.errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  const otherErr = new OtherError(serverErrorMessage);
  res.status(otherErr.statusCode).send({ message: otherErr.message });

  return next();
};
