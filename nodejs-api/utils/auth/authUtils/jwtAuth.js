// eslint-disable-next-line node/no-missing-require
const jwt = require("jsonwebtoken");
const Auth = require("../base/auth");

class JWTAuth extends Auth {
  constructor({ authSecretKey }) {
    super();
    this.authSecretKey = authSecretKey;
  }

  async tokenCreationAsync(payload, expiresIn = "365d") {
    return jwt.sign(payload, this.authSecretKey, { expiresIn });
  }

  _verifyTokenAsync(token) {
    return new Promise(
      async function (resolve, reject) {
        jwt.verify(token, this.authSecretKey, function (err, decoded) {
          if (err) reject(err);
          else resolve(decoded);
        });
      }.bind(this)
    );
  }

  async verifyTokenAsync(token) {
    await this._verifyTokenAsync(token);
    return token;
  }

  decodeTokenAsync(token) {
    return this._verifyTokenAsync(token);
  }
}

module.exports = JWTAuth;
