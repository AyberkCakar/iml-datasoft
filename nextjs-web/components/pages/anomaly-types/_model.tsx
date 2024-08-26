export interface IFailureType {
  id?: number;
  failureName?: string;
  timeInterval?: number | string;
  soundAnomalyMultiplier?: number | string;
  vibrationAnomalyMultiplier?: number | string;
  temperatureAnomalyMultiplier?: number | string;
}

export interface IFailureTypesResult {
  failure_types: IFailureType[];
  failure_types_aggregate: {
    aggregate: { count: number };
  };
}
