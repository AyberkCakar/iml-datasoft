const { gql } = require("graphql-request");

class AuthQuerys {
  constructor(HasuraContext) {
    this._client = HasuraContext;
  }

  async loginAsync({ emailAddress, password }) {
    const query = gql`
      query login($emailAddress: String!, $password: String!) {
        users(
          where: {
            emailAddress: { _eq: $emailAddress }
            password: { _eq: $password }
          }
        ) {
          id
          emailAddress
          firstName
          lastName
        }
      }
    `;

    return this._client.request(query, { emailAddress, password });
  }

  async addUserAsync(user) {
    const query = gql`
      mutation addUser($user: users_insert_input!) {
        insert_users_one(object: $user) {
          id
        }
      }
    `;
    return this._client.request(query, { user });
  }

  async changePasswordAsync({ id, password, newPassword }) {
    const query = gql`
      mutation changePassword(
        $id: Int!
        $password: String!
        $newPassword: String!
      ) {
        update_users(
          where: { id: { _eq: $id }, password: { _eq: $password } }
          _set: { password: $newPassword }
        ) {
          affected_rows
        }
      }
    `;
    return this._client.request(query, { id, password, newPassword });
  }
}

module.exports = AuthQuerys;
