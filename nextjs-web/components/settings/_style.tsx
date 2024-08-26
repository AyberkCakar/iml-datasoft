import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsBase = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
`;

export const Flag = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ThemeIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primaryColor};
`;

export const Hr = styled.hr`
  color: ${(props) => props.theme.colors.hrColor};
  height: 24px;
  margin: 0 8px;
`;
