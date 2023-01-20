const { otherUserInfoErrorCode } = require('./responseStatuses');

module.exports.OtherUserInfoError = class OtherUserInfoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'otherUserInfoError';
    this.statusCode = otherUserInfoErrorCode;
  }
};
