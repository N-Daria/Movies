const { otherErrorCode } = require('./responseStatuses');

module.exports.OtherError = class OtherError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = otherErrorCode;
  }
};
