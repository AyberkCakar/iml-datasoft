import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from '../../hooks/useTranslation';
import { FormModal } from '../modal';
import { CHANGE_PASSWORD } from './_graphql';
import { IChangePassword, IChangePasswordModal } from './_types';
import { AlertMessage } from '../alert';
import { InputField } from '../form-card/styles';
import { FormModalBody } from './_styles';

export default function ChangePasswordModal({
  openState,
  onClose
}: IChangePasswordModal) {
  const { t } = useTranslation();

  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [changePasswordRequest, setChangePasswordRequest] =
    React.useState<IChangePassword>({
      newPassword: '',
      password: ''
    });

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const handleSave = () => {
    changePassword({
      variables: changePasswordRequest
    })
      .then(() => {
        setAlertSuccess(true);
        handleClose();
      })
      .catch(() => {
        setAlertSuccess(false);
      })
      .finally(() => {
        setAlertOpen(true);
      });
  };

  return (
    <>
      <FormModal
        onSave={() => handleSave()}
        openState={openState}
        onClose={handleClose}
        modalTitle={t('changePassword.modalTitle')}
      >
        <FormModalBody>
          <InputField
            label={t('changePassword.password')}
            variant="outlined"
            fullWidth
            size="small"
            type="password"
            id="password"
            value={changePasswordRequest.password}
            onChange={(e) =>
              setChangePasswordRequest({
                ...changePasswordRequest,
                password: e.target.value
              })
            }
          />
          <InputField
            label={t('changePassword.newPassword')}
            variant="outlined"
            fullWidth
            type="password"
            id="newPassword"
            size="small"
            value={changePasswordRequest.newPassword}
            onChange={(e) =>
              setChangePasswordRequest({
                ...changePasswordRequest,
                newPassword: e.target.value
              })
            }
          />
        </FormModalBody>
      </FormModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? t('changePassword.successMessage')
            : t('changePassword.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
