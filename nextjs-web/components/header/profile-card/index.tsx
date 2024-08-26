import React from 'react';
import {
  Avatar,
  AvatarCard,
  AvatarInformationContainer,
  AvatarName,
  AvatarTitle,
  CardContainer,
  Hr,
  ProfileCardItem,
  ProfileCardItemText,
  MenuIcon
} from './_styles';
import { UserService } from '../../../utils/services/userService';
import { IUser } from '../../../models/user';
import { useLogout } from '../../../hooks/useLogout';
import { useRouter } from 'next/router';
import ChangePasswordModal from '../../change-password';
import { useTranslation } from '../../../hooks/useTranslation';

export const ProfileCard = ({ isOpen }: any) => {
  const { t } = useTranslation();
  const user: IUser = UserService.getUser() as IUser;
  const { logout } = useLogout();
  const router = useRouter();

  const [changePasswordModalOpenState, setChangePasswordModalOpenState] =
    React.useState<boolean>(false);

  const onLogoutClick = () => {
    logout();
    router.reload();
  };

  return (
    <>
      <CardContainer
        style={{ maxHeight: isOpen ? '200px' : '0', height: '200px' }}
      >
        <AvatarCard>
          <Avatar src={'/assets/user-avatar.png'} />
          <AvatarInformationContainer>
            <AvatarName>
              {user.firstName} {user.lastName}
            </AvatarName>
            <AvatarTitle>Admin</AvatarTitle>
          </AvatarInformationContainer>
        </AvatarCard>
        <Hr />
        <ProfileCardItem
          key={'user-settings'}
          onClick={() => router.replace('user-settings')}
        >
          <MenuIcon baseClassName={'fa-solid'} className={'fa-user-gear'} />

          <ProfileCardItemText id="userSettings">
            {t('header.userSettings').charAt(0).toUpperCase() +
              t('header.userSettings').slice(1)}
          </ProfileCardItemText>
        </ProfileCardItem>
        <ProfileCardItem
          key={'change-password'}
          onClick={() => setChangePasswordModalOpenState(true)}
        >
          <MenuIcon baseClassName={'fa-solid'} className={'fa-user-shield'} />
          <ProfileCardItemText id="changePassword">
            {t('header.changePassword').charAt(0).toUpperCase() +
              t('header.changePassword').slice(1)}
          </ProfileCardItemText>
        </ProfileCardItem>
        <ProfileCardItem key={'logout'} onClick={() => onLogoutClick()}>
          <MenuIcon
            baseClassName={'fa-solid'}
            className={'fa-house-circle-xmark'}
          />

          <ProfileCardItemText>
            {t('header.logout').charAt(0).toUpperCase() +
              t('header.logout').slice(1)}
          </ProfileCardItemText>
        </ProfileCardItem>
      </CardContainer>
      <ChangePasswordModal
        openState={changePasswordModalOpenState}
        onClose={() => setChangePasswordModalOpenState(false)}
      ></ChangePasswordModal>
    </>
  );
};
