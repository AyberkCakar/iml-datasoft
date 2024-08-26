import { gql } from '@apollo/client';

export const GET_DATASETS = gql`
  query GET_DATASETS {
    simulators {
      simulatorName
      id
    }
    real_datasets {
      datasetName
      id
    }
  }
`;

export const GET_ALGORITHMS = gql`
  query GET_ALGORITHMS {
    algorithms(order_by: { algorithmName: asc }) {
      id
      algorithmName
    }
  }
`;

export const INSERT_ALGORITHM_SETTINGS = gql`
  mutation INSERT_ALGORITHM_SETTINGS(
    $algorithm_settings: algorithm_settings_insert_input!
  ) {
    insert_algorithm_settings_one(object: $algorithm_settings) {
      id
    }
  }
`;

export const INSERT_ALGORITHM_RESULTS = gql`
  mutation INSERT_ALGORITHM_RESULTS(
    $algorithm_results: [algorithm_results_insert_input!]!
  ) {
    insert_algorithm_results(objects: $algorithm_results) {
      affected_rows
    }
  }
`;
