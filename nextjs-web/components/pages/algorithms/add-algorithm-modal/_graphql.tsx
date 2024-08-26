import { gql } from '@apollo/client';

export const ADD_ALGORITHM = gql`
  mutation ADD_ALGORITHM($algorithm: algorithms_insert_input!) {
    insert_algorithms_one(object: $algorithm) {
      id
    }
  }
`;

export const UPDATE_ALGORITHM = gql`
  mutation UPDATE_ALGORITHM($id: Int!, $algorithm: algorithms_set_input!) {
    update_algorithms_by_pk(pk_columns: { id: $id }, _set: $algorithm) {
      id
    }
  }
`;
