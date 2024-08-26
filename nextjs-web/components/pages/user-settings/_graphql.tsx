import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: Int!, $user: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $user) {
      id
    }
  }
`;
