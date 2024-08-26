import styled from 'styled-components';
import { Icon } from '@mui/material';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 84.15vh;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: normal;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  color: #343a40 !important;
`;

export const HeaderTitle = styled.h1`
  font-weight: 500;
`;

export const HeaderIcon = styled(Icon)`
  font-size: 36px;
  display: flex;
  flex-direction: column;
  align-self: center;
  color: #6c757d !important;
  width: 55px;
`;
