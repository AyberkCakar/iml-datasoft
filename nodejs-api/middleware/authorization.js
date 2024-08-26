const HttpStatusCode = require("http-status-codes");
const { apiKey } = require("../utils/config");

class Authorization {
  constructor() {}

  static async apiKeyControl(req, res, next) {
    if (req.headers["x-api-key"] == apiKey) next();
    else res.status(HttpStatusCode.FORBIDDEN).json("Unauthorized transaction.");
  }
}

module.exports = Authorization;
