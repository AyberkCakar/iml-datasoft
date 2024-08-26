import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { IGlobalStyle } from './_type';
import { fontFamily } from '../../styles/typography';

export const GlobalStyle = createGlobalStyle<IGlobalStyle>`
  body {
    background-color: ${(props) => props.backgroundColor};
    margin: 0;
    padding: 0;
    font-family: ${fontFamily} !important;
  }
`;

export const LayoutBase = styled.div``;
