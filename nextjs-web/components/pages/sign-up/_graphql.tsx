import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SIGN_UP(
    $emailAddress: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      emailAddress: $emailAddress
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
    }
  }
`;
