const joi = require("joi");

module.exports = {
  POST: joi.object().keys({
    body: joi.object().keys({
      input: joi.object().keys({
        password: joi.string().min(6).max(99).required(),
        newPassword: joi.string().min(6).max(99).required(),
      }),
      session_variables: joi.object().keys({
        "x-hasura-user-id": joi.string().required(),
      }),
    }),
  }),
};
