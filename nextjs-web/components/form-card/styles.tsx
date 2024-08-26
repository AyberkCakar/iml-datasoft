import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const FormBodyContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 30px;
`;

export const FormContainer = styled.div`
  width: 95%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-top: 3px solid #ef5323;
  margin-bottom: 50px;
`;

export const InputField = styled(TextField)`
  margin-bottom: 30px;
  min-width: 49%;
  max-width: 49%;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;
  width: 100%;
  text-align: right;
  margin-left: 20px;
  margin-bottom: 25px;
`;

export const SaveButton = styled(Button)`
  height: 36px;
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;
