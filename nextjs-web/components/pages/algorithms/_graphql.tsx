import { gql } from '@apollo/client';

export const GET_ALGORITHMS = gql`
  query GET_RALGORITHMS(
    $limit: Int
    $offset: Int
    $where: algorithms_bool_exp
    $order_by: [algorithms_order_by!]
  ) {
    algorithms(
      limit: $limit
      offset: $offset
      where: $where
      order_by: $order_by
    ) {
      id
      algorithmName
    }
    algorithms_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const DELETE_ALGORITHM = gql`
  mutation DELETE_ALGORITHM($id: Int!) {
    delete_algorithms_by_pk(id: $id) {
      id
    }
  }
`;
