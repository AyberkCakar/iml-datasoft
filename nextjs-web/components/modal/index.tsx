import React from 'react';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import {
  ModalActionContainer,
  ModalBody,
  ModalBox,
  CancelButton,
  ModalHeader,
  ModalHeaderTitle
} from './_styles';
import { IFormModal, EModalSize } from './_model';
import { useTranslation } from '../../hooks/useTranslation';

export const FormModal = ({
  openState,
  onClose,
  onSave,
  children,
  modalTitle,
  modalSize = EModalSize.MD,
  isShowModalSaveButton = true
}: IFormModal) => {
  const { t } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Modal
        open={openState}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
      >
        <ModalBox modalSize={modalSize}>
          <ModalHeader>
            <ModalHeaderTitle variant="h4" id="modal-title">
              {modalTitle}
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalBody id="modal-body">{children}</ModalBody>
          <ModalActionContainer>
            {isShowModalSaveButton ? (
              <Button variant="contained" color="primary" onClick={onSave}>
                {t('general.save')}
              </Button>
            ) : (
              ''
            )}
            <CancelButton variant="contained" onClick={handleClose}>
              {t('general.cancel')}
            </CancelButton>
          </ModalActionContainer>
        </ModalBox>
      </Modal>
    </div>
  );
};
