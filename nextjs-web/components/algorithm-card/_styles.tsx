import styled from 'styled-components';

export const AlgorithmCardContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

export const AlgorithmCardBodyContainer = styled.div`
  width: 300px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-top: 3px solid #05428b;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlgorithmCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlgorithmCardInformation = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  height: 95px;
`;

export const AlgorithmCardHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 5px;
`;

export const AlgorithmCardSplitter = styled.hr`
  width: 280px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95px;
`;
