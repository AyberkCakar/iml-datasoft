import { IRealDataset } from '../_types';

export interface IAddRealDatasetModal {
  openState: boolean;
  onClose: () => void;
  saveResponse: (success: boolean) => void;
  realDataset: IRealDataset | null;
}

export interface IAddRealDatasetVariable {
  realDataset?: IRealDataset;
  id?: number;
}
