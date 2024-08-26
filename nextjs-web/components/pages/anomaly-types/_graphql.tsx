import { gql } from '@apollo/client';

export const GET_FAILURE_TYPES = gql`
  query GET_FAILURE_TYPES(
    $limit: Int
    $offset: Int
    $where: failure_types_bool_exp
    $order_by: [failure_types_order_by!]
  ) {
    failure_types(
      limit: $limit
      offset: $offset
      where: $where
      order_by: $order_by
    ) {
      failureName
      id
      soundAnomalyMultiplier
      temperatureAnomalyMultiplier
      timeInterval
      vibrationAnomalyMultiplier
    }
    failure_types_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const ADD_FAILURE_TYPE = gql`
  mutation sendFailureType($failureType: failure_types_insert_input!) {
    insert_failure_types_one(object: $failureType) {
      id
    }
  }
`;

export const UPDATE_FAILURE_TYPE = gql`
  mutation updateFailureType(
    $id: Int!
    $failureType: failure_types_set_input!
  ) {
    update_failure_types_by_pk(pk_columns: { id: $id }, _set: $failureType) {
      id
    }
  }
`;

export const DELETE_FAILURE_TYPE = gql`
  mutation deleteFailureType($id: Int!) {
    delete_failure_types_by_pk(id: $id) {
      id
    }
  }
`;
