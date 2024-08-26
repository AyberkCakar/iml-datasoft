module.exports = {
  authSecretKey: process.env.AUTH_SECRET_KEY,
  hasura: {
    secretKey: process.env.HASURA_SECRET_KEY,
    endpoint: process.env.HASURA_ENDPOINT,
  },
  apiKey: process.env.API_KEY,
  environment: process.env.ENVIRONMENT,
};
