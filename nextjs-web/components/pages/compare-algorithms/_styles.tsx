import styled from 'styled-components';
import { Button } from '@mui/material';

export const CancelButton = styled(Button)`
  background-color: #ccc;
  margin-left: 20px;
  color: #000;
  &:hover {
    background-color: #999;
  }
`;

export const VerticalLine = styled.div`
  height: 95%;
  width: 1px;
  background-color: #999;
  margin: 0 auto;
`;

export const GetAlgorithmButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

export const AlgorithmContainer = styled.div`
  width: 45%;
  margin-bottom: 30px;
`;

export const CompareAlgorithmsBody = styled.div`
  min-width: 100%;
  display: flex;
`;

export const AlgorithmCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
