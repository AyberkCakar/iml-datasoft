import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { ModalBoxProps, EModalSize } from './_model';

export const ModalBox = styled(Box)<ModalBoxProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
  width: ${(props) => {
    if (props.modalSize === EModalSize.SM) {
      return '40%';
    } else if (props.modalSize === EModalSize.MD) {
      return '50%';
    } else if (props.modalSize === EModalSize.LG) {
      return '70%';
    } else {
      return '90%';
    }
  }};
`;

export const ModalHeader = styled.div`
  background-color: #53585f !important;
  border-bottom: 4px solid #ef5323 !important;
  padding: 20px;
  padding-left: 30px;
  border-radius: 15px 15px 0 0;
`;

export const ModalHeaderTitle = styled(Typography)`
  color: white;
`;

export const ModalBody = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  overflow: scroll;
  max-height: 70vh;
`;

export const ModalActionContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  float: right;
`;

export const CancelButton = styled(Button)`
  background-color: gray;
  margin-left: 10px;
  margin-right: 40px;

  :hover {
    background-color: #706e6e;
  }
`;
