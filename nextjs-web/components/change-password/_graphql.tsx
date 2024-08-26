import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD($newPassword: String!, $password: String!) {
    changePassword(newPassword: $newPassword, password: $password) {
      message
    }
  }
`;
