import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #53585f;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  border-left: 1px solid gray;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
`;

export const ProfileButtonAvatar = styled.img`
  width: 42px;
  height: 42px;
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileButtonText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  font-size: 16px;
`;

export const ToggleProfileButton = styled(ToggleButton)`
  margin-right: 20px;
`;
