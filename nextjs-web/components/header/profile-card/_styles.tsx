import { Button, Icon } from '@mui/material';
import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #5d6673 !important;
  border-radius: 5px !important;
  width: 200px !important;
  padding: 10px !important;
  transition: max-height 0.3s ease-in-out !important;
  position: absolute;
  top: 65px;
  right: 10px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const AvatarCard = styled.div`
  display: flex;

  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ProfileCardItem = styled(Button)`
  color: white !important;
  justify-content: start !important;
  align-self: center;
  width: 100%;

  :hover {
    background-color: transparent;
  }
`;

export const ProfileCardItemText = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 300;
  margin-left: 5px;
  align-self: center;
  text-transform: none;
  &::first-letter {
    text-transform: uppercase;
  }
  & {
    text-transform: none;
  }
`;

export const Avatar = styled.img`
  width: 52px;
  height: 52px;
`;

export const AvatarInformationContainer = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 3px;
`;

export const AvatarName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export const AvatarTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 13px;
  color: #bab9b9;
`;

export const Hr = styled.hr`
  width: 100%;
`;

export const MenuIcon = styled(Icon)`
  color: white;
  font-size: 18px;
  width: 30px;
`;
