const { hasura } = require("../../utils/config");
const { GraphQLClient } = require("graphql-request");

class HasuraContext {
  constructor() {}

  static async createAsync({ authorizationHeader, hasuraQuerys }) {
    let headers;
    if (authorizationHeader) headers = { authorization: authorizationHeader };
    else headers = { "x-hasura-admin-secret": hasura.secretKey };
    return new hasuraQuerys(new GraphQLClient(hasura.endpoint, { headers }));
  }
}

module.exports = HasuraContext;
