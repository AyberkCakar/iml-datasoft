import { gql } from '@apollo/client';

export const GET_FAILURE_TYPES = gql`
  query GET_FAILURE_TYPES {
    failure_types(order_by: { id: asc }) {
      id
      failureName
    }
  }
`;

export const ADD_SIMULATOR = gql`
  mutation sendSimulator($simulator: simulators_insert_input!) {
    insert_simulators_one(object: $simulator) {
      id
    }
  }
`;

export const UPDATE_SIMULATOR = gql`
  mutation updateSimulator($id: Int!, $simulator: simulators_set_input!) {
    update_simulators_by_pk(pk_columns: { id: $id }, _set: $simulator) {
      id
    }
  }
`;

export const ADD_SIMULATOR_PARAMETERS = gql`
  mutation addSimulatorParameters(
    $simulatorParameters: [simulator_parameters_insert_input!] = []
  ) {
    insert_simulator_parameters(objects: $simulatorParameters) {
      affected_rows
    }
  }
`;

export const GET_SIMULATOR = gql`
  query GET_SIMULATOR($id: Int!) {
    simulators_by_pk(id: $id) {
      simulatorName
      id
      minExpectedTemperatureValue
      maxExpectedTemperatureValue
      minExpectedSoundValue
      maxExpectedSoundValue
      minExpectedVibrationValue
      maxExpectedVibrationValue
      simulator_parameters {
        failureTypeId
      }
    }
  }
`;
