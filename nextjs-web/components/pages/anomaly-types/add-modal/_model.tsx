import { IFailureType } from '../_model';

export interface IAddFailureTypeModal {
  openState: boolean;
  onClose: () => void;
  saveResponse: (success: boolean) => void;
  failureType: IFailureType | null;
}

export interface IAddFailureVariable {
  failureType?: IFailureType;
  id?: number;
}
