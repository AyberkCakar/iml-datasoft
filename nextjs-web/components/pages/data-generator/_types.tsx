import { IDataset } from './information-modal/_types';

export interface IDataGenerator {
  id?: number;
  simulatorName: string;
  minExpectedTemperatureValue?: number | string;
  maxExpectedTemperatureValue?: number | string;
  minExpectedSoundValue?: number | string;
  maxExpectedSoundValue?: number | string;
  minExpectedVibrationValue?: number | string;
  maxExpectedVibrationValue?: number | string;
  dataCount?: number | string;
  anomalyCount?: number | string;
  dataset?: IDataset;
  simulator_parameters?: IDataGeneratorParameters[];
}

export interface IDataGeneratorResult {
  simulators: IDataGenerator[];
  simulators_aggregate: {
    aggregate: { count: number };
  };
}

export interface IDataGeneratorParameters {
  simulatorId?: number;
  failureTypeId: number;
}

export interface IDataGeneratorRequest {
  simulator: IDataGenerator;
  id?: number;
}
