const authUtils = require('./authUtils');

class AuthFactory {
  constructor() {}

  static create(provider, args) {
    let authUtil = authUtils[provider];
    if (!authUtil)
      throw new Error(
        'Auth util is not found. Auth util provider: ' + provider
      );
    return new authUtil(args);
  }
}

module.exports = AuthFactory;
