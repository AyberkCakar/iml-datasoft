import { Button, DialogActions } from '@mui/material';
import styled from 'styled-components';

export const CancelButton = styled(Button)`
  background-color: gray;
  margin-left: 10px !important;
  margin-right: 5px !important;
  :hover {
    background-color: #706e6e;
  }
`;

export const ModalDialogActions = styled(DialogActions)`
  margin-bottom: 10px !important;
`;
