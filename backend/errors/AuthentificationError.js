const { authentificationErrorCode } = require('./responseStatuses');

module.exports.AuthentificationError = class AuthentificationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthentificationError';
    this.statusCode = authentificationErrorCode;
  }
};
