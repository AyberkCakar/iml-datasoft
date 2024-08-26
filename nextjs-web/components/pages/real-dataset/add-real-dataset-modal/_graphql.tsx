import { gql } from '@apollo/client';

export const ADD_REAL_DATASET = gql`
  mutation ADD_REAL_DATASET($realDataset: real_datasets_insert_input!) {
    insert_real_datasets_one(object: $realDataset) {
      id
    }
  }
`;

export const UPDATE_REAL_DATASET = gql`
  mutation UPDATE_REAL_DATASET(
    $id: Int!
    $realDataset: real_datasets_set_input!
  ) {
    update_real_datasets_by_pk(pk_columns: { id: $id }, _set: $realDataset) {
      id
    }
  }
`;

export const ADD_DATASET = gql`
  mutation ADD_DATASET($dataset: datasets_insert_input!) {
    insert_datasets_one(object: $dataset) {
      id
    }
  }
`;
