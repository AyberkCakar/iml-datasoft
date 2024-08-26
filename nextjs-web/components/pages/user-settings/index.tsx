import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { UserService } from '../../../utils/services/userService';
import { UPDATE_USER } from './_graphql';
import { useMutation } from '@apollo/client';
import { AlertMessage } from '../../alert';
import { IUserSettings } from './_types';
import { IUser } from '../../../models/user';
import { FormCard } from '../../form-card';
import {
  ButtonContainer,
  InputField,
  SaveButton
} from '../../form-card/styles';
import { PageContainer } from '../../page-container';

export default function UserSettings() {
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number>(0);
  const [userSettingsRequest, setUserSettingsRequest] =
    React.useState<IUserSettings>({
      firstName: '',
      lastName: '',
      emailAddress: ''
    });
  const { t } = useTranslation();

  const [updateUser] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    const user: IUser | undefined = UserService.getUser();

    if (user) {
      setUserId(user.id);
      setUserSettingsRequest({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
      });
    }
  }, []);

  const onSaveClick = () => {
    updateUser({
      variables: {
        id: userId,
        user: userSettingsRequest
      }
    })
      .then(() => {
        setAlertSuccess(true);
      })
      .catch(() => {
        setAlertSuccess(false);
      })
      .finally(() => {
        setAlertOpen(true);
      });
  };

  return (
    <PageContainer
      pageTitle={t('userSettings.pageTitle')}
      pageIcon={'fa-user-cog'}
    >
      <FormCard>
        <InputField
          label={t('userSettings.firstName')}
          variant="outlined"
          fullWidth
          size="small"
          value={userSettingsRequest.firstName}
          onChange={(e) =>
            setUserSettingsRequest({
              ...userSettingsRequest,
              firstName: e.target.value
            })
          }
        />
        <InputField
          label={t('userSettings.lastName')}
          variant="outlined"
          fullWidth
          size="small"
          value={userSettingsRequest.lastName}
          onChange={(e) =>
            setUserSettingsRequest({
              ...userSettingsRequest,
              lastName: e.target.value
            })
          }
        />
        <InputField
          label={t('userSettings.emailAddress')}
          variant="outlined"
          fullWidth
          size="small"
          value={userSettingsRequest.emailAddress}
          onChange={(e) =>
            setUserSettingsRequest({
              ...userSettingsRequest,
              emailAddress: e.target.value
            })
          }
        />
        <ButtonContainer>
          <SaveButton onClick={() => onSaveClick()}>
            {t('general.saveChanges')}
          </SaveButton>
        </ButtonContainer>
      </FormCard>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? t('userSettings.successMessage')
            : t('userSettings.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </PageContainer>
  );
}
