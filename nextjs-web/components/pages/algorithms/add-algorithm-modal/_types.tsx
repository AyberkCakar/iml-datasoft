import { IAlgorithm } from '../_types';

export interface IAddAlgorithmModal {
  openState: boolean;
  onClose: () => void;
  saveResponse: (success: boolean) => void;
  algorithm: IAlgorithm | null;
}

export interface IAddAlgorithmVariable {
  algorithm?: IAlgorithm;
  id?: number;
}
