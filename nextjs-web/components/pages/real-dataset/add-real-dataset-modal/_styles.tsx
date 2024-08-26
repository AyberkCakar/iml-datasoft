import { TextField } from '@mui/material';
import styled from 'styled-components';

export const ModalInput = styled(TextField)`
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
