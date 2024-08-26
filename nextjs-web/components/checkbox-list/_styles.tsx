import { List } from '@mui/material';
import styled from 'styled-components';

export const CheckboxListContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 48%;
  max-width: 607px;
`;

export const CheckboxListHeader = styled.h3`
  font-weight: 400;
  margin: 15px 0 15px 15px;
`;

export const CheckboxListSplitter = styled.hr`
  width: 95%;
`;

export const ListContainer = styled(List)`
  background-color: 'background.paper';
  height: 250px;
  overflow: scroll;
`;
