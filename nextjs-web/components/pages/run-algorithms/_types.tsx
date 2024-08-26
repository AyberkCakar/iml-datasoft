import { IAlgorithm } from '../algorithms/_types';

export interface IAlgorithmSettingRequest {
  datasetId: number | string;
  algorithmsIds: number[];
  isRealDataset: boolean;
  algorithmSettingName: string;
  sensorTypes: string[];
}

export interface IAlgorithmSetting {
  algorithmSettingName: string;
  simulatorId?: number;
  realDatasetId?: number;
  sensorTypes: string;
}

export interface IAlgorithmResult {
  algorithmId: number;
  algorithmSettingId: number;
}

export interface IAlgorithmSettingVariables {
  algorithm_settings: IAlgorithmSetting;
}

export interface IGroupedDataset {
  id: number | string;
  simulatorName?: string;
  datasetName?: string;
  __typename?: string;
}
export interface IDatasets {
  simulators: IGroupedDataset[];
  real_datasets: IGroupedDataset[];
}

export interface IGetAlgorithm {
  algorithms: IAlgorithm[];
}
