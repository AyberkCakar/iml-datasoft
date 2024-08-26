import { Button, FormControl } from '@mui/material';
import styled from 'styled-components';
import { IAddButtonProps } from './_type';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddButton = styled(Button)<IAddButtonProps>`
  align-self: flex-start;
  height: 40px;
  text-transform: none;
  display: ${(props) => (props.isAddButton ? 'flex' : 'none')};
  &::first-letter {
    text-transform: uppercase;
  }
  & {
    text-transform: none;
  }
`;

export const SearchFormControl = styled(FormControl)`
  margin-bottom: 20px;
  width: 25ch;
  align-self: flex-end;
`;

export const DataGridConteiner = styled.div`
  height: 500px;
  width: 100%;
`;
