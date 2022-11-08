const { UndefinedError } = require('../errors/UndefinedError');

module.exports.undefinedPage = (req, res, next) => {
  const newErr = new UndefinedError('Запрашиваемая страница не найдена');
  return next(newErr);
};
