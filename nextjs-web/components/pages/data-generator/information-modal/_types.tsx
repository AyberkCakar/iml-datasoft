export interface IInformationModal {
  openState: boolean;
  onClose: () => void;
  settings: IInformationModalSettings;
}

export interface IInformationModalSettings {
  simulatorId: number;
  modalType: EModalType | null;
}

export enum EModalType {
  PARAMETERS = 'parameters',
  RESULT = 'result'
}

export interface ISimulatorResultResponse {
  datasets: IDataset[];
  simulator_parameters: ISimulatorParameterData[];
}

export interface IDataset {
  result: IDatasetResult;
}

export interface IDatasetResult {
  time: number[];
  tag: string[];
  sound: number[];
  vibration: number[];
  temperature: number[];
}

export interface ITableResultData {
  id: number;
  time: number;
  tag: string;
  sound: string;
  vibration: string;
  temperature: string;
}

export interface ISimulatorParameter {
  failureName: string;
  id: number;
  period: number;
  soundAnomalyMultiplier: number;
  temperatureAnomalyMultiplier: number;
  timeInterval: number;
  vibrationAnomalyMultiplier: number;
}

export interface ISimulatorParameterData {
  failure_type: ISimulatorParameter;
}
