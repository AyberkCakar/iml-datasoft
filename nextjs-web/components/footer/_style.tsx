import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  height: 60px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const FooterDescription = styled.p`
  margin-left: 50px;
`;

export const VersionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VersionText = styled.p`
  margin-right: 7px;
`;

export const Version = styled.p`
  margin-right: 20px;
  font-weight: 300;
`;
