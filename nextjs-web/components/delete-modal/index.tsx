import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CancelButton, ModalDialogActions } from './_style';
import { IDeleteModal } from './_type';
import { useTranslation } from '../../hooks/useTranslation';

export default function DeleteModal({
  openState,
  onClose,
  onDeleteClick,
  modalInfo
}: IDeleteModal) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog
        open={openState}
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DialogTitle id="delete-modal-title">{modalInfo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-modal-description">
            {modalInfo.description}
          </DialogContentText>
        </DialogContent>
        <ModalDialogActions>
          <Button
            size={'small'}
            variant="contained"
            color="primary"
            onClick={onDeleteClick}
          >
            {t('general.delete')}
          </Button>
          <CancelButton
            size={'small'}
            variant="contained"
            onClick={handleClose}
          >
            {t('general.cancel')}
          </CancelButton>
        </ModalDialogActions>
      </Dialog>
    </div>
  );
}
