import { gql } from '@apollo/client';

export const GET_ALGORITHM_SETTINGS = gql`
  query GET_ALGORITHM_SETTINGS {
    algorithm_settings(order_by: { algorithmSettingName: asc }) {
      algorithmSettingName
      id
    }
  }
`;

export const GET_ALGORITHM_RESULTS = gql`
  query GET_ALGORITHM_RESULTS($algorithmSettingId: Int!) {
    algorithm_results(
      where: { algorithmSettingId: { _eq: $algorithmSettingId } }
      order_by: { algorithm: { algorithmName: asc } }
    ) {
      algorithm {
        algorithmName
      }
      result
      id
    }
  }
`;
