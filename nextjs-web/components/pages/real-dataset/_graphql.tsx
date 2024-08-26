import { gql } from '@apollo/client';

export const GET_REAL_DATASETS = gql`
  query GET_REAL_DATASETS(
    $limit: Int
    $offset: Int
    $where: real_datasets_bool_exp
    $order_by: [real_datasets_order_by!]
  ) {
    real_datasets(
      limit: $limit
      offset: $offset
      where: $where
      order_by: $order_by
    ) {
      id
      datasetName
    }
    real_datasets_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const DELETE_REAL_DATASET = gql`
  mutation DELETE_REAL_DATASET($id: Int!) {
    delete_real_datasets_by_pk(id: $id) {
      id
    }
  }
`;
