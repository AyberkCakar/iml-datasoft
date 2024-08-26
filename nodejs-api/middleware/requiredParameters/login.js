const joi = require("joi");

module.exports = {
  POST: joi.object().keys({
    body: joi.object().keys({
      input: joi.object().keys({
        emailAddress: joi.string().email().max(200).required(),
        password: joi.string().max(99).required(),
      }),
    }),
  }),
};
