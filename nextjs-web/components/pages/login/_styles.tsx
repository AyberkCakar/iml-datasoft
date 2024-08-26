import styled from 'styled-components';
import { Box, Button } from '@mui/material';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #ccc;
  text-align: center;
  max-width: 500px;
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  margin-top: 20px;
  padding: 20px 20px 20px 20px;
`;

export const SignInButton = styled(Button)`
  margin-top: 48px;
  margin-bottom: 16px;
  height: 50px;
  font-size: 18px;
  color: white;
  background-color: black;
  text-transform: none;
  &::first-letter {
    text-transform: uppercase;
  }
  & {
    text-transform: none;
  }

  :hover {
    background-color: black;
  }
`;

export const Logo = styled.img`
  width: 250px;
  height: 250px;
`;

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BodyBox = styled(Box)`
  margin-top: 10px;
`;
