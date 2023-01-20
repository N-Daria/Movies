const { alreadyExsistsErrorCode } = require('./responseStatuses');

module.exports.AlreadyExsistsError = class AlreadyExsistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'alreadyExsistsError';
    this.statusCode = alreadyExsistsErrorCode;
  }
};
