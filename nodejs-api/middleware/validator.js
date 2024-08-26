const validators = require("./requiredParameters");
const HttpStatusCode = require("http-status-codes");

class Validator {
  constructor() {}

  static async request(req, res, next) {
    try {
      const validator = validators[req.url.replace("/", "")]
        ? validators[req.url.replace("/", "")][req.method]
        : null;
      if (validator) await validator.validateAsync(req, { allowUnknown: true });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = Validator;
