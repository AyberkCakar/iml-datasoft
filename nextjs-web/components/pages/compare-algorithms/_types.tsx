export interface IAlgorithmSetting {
  algorithmSettingName: string;
  simulatorId?: number;
  realDatasetId?: number;
  sensorTypes: string;
  id?: number;
}

export interface IAlgorithmSettings {
  algorithm_settings: IAlgorithmSetting[];
}

export interface ICompareAlgorithmRequest {
  algorithmSettingId1: number | string;
  algorithmSettingId2: number | string;
}

export interface ICompareAlgorithmVariables {
  algorithmSettingId: number;
}

export interface IResultParameters {
  accuracy: number;
  f1: number;
  recall: number;
  precision: number;
}

export interface IFormattedAlgorithmResult {
  id: number;
  algorithmName: string;
  result: IResultParameters | null;
}

export interface IAlgorithmResult {
  id: number;
  algorithm: {
    algorithmName: string;
  };
  result: IResultParameters | null;
}

export interface IAlgorithmResults {
  data: {
    algorithm_results: IAlgorithmResult[];
  };
}
