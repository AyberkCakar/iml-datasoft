import { TextField } from '@mui/material';
import styled from 'styled-components';

export const ModalInput = styled(TextField)`
  margin-bottom: 20px;
`;

export const GroupModalInput = styled(ModalInput)`
  margin-right: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
