import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import { IAlertMessage } from './_model';

export const AlertMessage = ({
  openState,
  description,
  alertSuccess,
  onClose
}: IAlertMessage) => {
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const handleAlertClose = () => {
    setOpenAlert(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      open={openState}
      autoHideDuration={2000}
      onClose={handleAlertClose}
    >
      <Alert
        onClose={handleAlertClose}
        severity={alertSuccess ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {description}
      </Alert>
    </Snackbar>
  );
};
