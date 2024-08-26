import styled from 'styled-components';
import { Button } from '@mui/material';
import { ButtonContainer } from '../../form-card/styles';

export const CancelButton = styled(Button)`
  background-color: #ccc;
  margin-left: 20px;
  color: #000;
  &:hover {
    background-color: #999;
  }
`;

export const RunAlgorithmsButtonContainer = styled(ButtonContainer)`
  margin-top: 30px;
`;
