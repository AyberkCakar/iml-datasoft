import { Button, Icon } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Header = styled.header`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
`;

export const Content = styled.main`
  flex: 1;
  overflow: scroll;
`;

export const Drawer = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? '250px' : '0')};
  height: 100%;
  background-color: #53585f !important;
  transition: width 0.3s;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
`;

export const Body = styled.div`
  overflow: scroll !important;
`;
export const ParentContent = styled.div`
  display: flex;
  flex-direction: column;

  &.w-calc {
    width: calc(max(500px, 100% - 250px));
  }

  &.w-100 {
    width: 100%;
  }
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-left: 25px;
  margin-bottom: 10px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const LogoContainer = styled.div`
  height: 72px;
  display: flex;
  border-bottom: 1px solid gray;
  width: 100%;
`;

export const LogoTitle1 = styled.h2`
  color: #68a49f;
  align-self: center;
`;

export const LogoTitle2 = styled.h2`
  color: #f652a0;
  align-self: center;
`;

export const ButtonContainer = styled.div`
  display: flex !important;
  margin-left: 10px !important;
  width: 100% !important;
  margin-top: 20px !important;
  flex-direction: column !important;
`;

export const MenuText = styled.div`
  display: flex;
  font-size: 14px !important;
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

export const MenuItem = styled(Button)`
  margin-top: 5px !important;
  width: 225px !important;
  color: white !important;
  justify-content: start !important;

  :hover {
    background-color: #706e6e;
  }
`;

export const MenuIcon = styled(Icon)`
  color: white;
  font-size: 18px;
  width: 30px;
`;
