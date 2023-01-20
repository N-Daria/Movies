const { UndefinedError } = require('../errors/UndefinedError');
const { undefinedMessage } = require('../errors/responseMessages');

module.exports.undefinedPage = (req, res, next) => {
  const newErr = new UndefinedError(undefinedMessage);
  return next(newErr);
};
