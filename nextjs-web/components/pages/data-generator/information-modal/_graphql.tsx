import { gql } from '@apollo/client';

export const GET_SIMULATOR_PARAMETERS = gql`
  query GET_SIMULATOR_PARAMETERS($simulatorId: Int!) {
    simulator_parameters(where: { simulatorId: { _eq: $simulatorId } }) {
      failure_type {
        failureName
        id
      }
    }
  }
`;

export const GET_SIMULATOR_RESULT = gql`
  query GET_SIMULATOR_RESULT($simulatorId: Int!) {
    datasets(where: { simulatorId: { _eq: $simulatorId } }) {
      result
    }
  }
`;
