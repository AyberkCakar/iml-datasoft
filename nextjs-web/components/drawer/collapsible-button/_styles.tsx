import { Button, Icon } from '@mui/material';
import styled from 'styled-components';

export const MenuItem = styled(Button)`
  margin-top: 5px !important;
  width: 225px !important;
  color: white !important;
  justify-content: start !important;

  :hover {
    background-color: #706e6e !important;
  }
`;

export const MenuChildItem = styled(MenuItem)`
  margin-left: 25px !important;
  width: 200px !important;
`;

export const MenuText = styled.div`
  display: flex;
  font-size: 14px;
  min-width: 120px;
  margin-left: 10px;
  align-self: center;
  text-transform: none;
  &::first-letter {
    text-transform: uppercase;
  }
  & {
    text-transform: none;
  }
`;

export const CollapsibleIcon = styled(Icon)`
  font-size: 16px;
  width: 40%;
`;
