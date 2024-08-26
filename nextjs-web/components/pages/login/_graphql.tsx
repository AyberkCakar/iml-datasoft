import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LOGIN($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) {
      token
      lastName
      id
      firstName
      emailAddress
    }
  }
`;
