import React from 'react';

export interface IFormModal {
  openState: boolean;
  onClose: () => void;
  onSave?: (event: any) => void;
  children: React.ReactNode;
  modalTitle: string;
  isShowModalSaveButton?: boolean;
  modalSize?: EModalSize;
}

export interface ModalBoxProps {
  modalSize: EModalSize;
}

export enum EModalSize {
  SM = 'small',
  MD = 'medium',
  LG = 'large',
  XL = 'xlarge'
}
