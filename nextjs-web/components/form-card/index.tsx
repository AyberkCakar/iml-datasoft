import React from 'react';
import { FormBodyContainer, FormContainer } from './styles';

export const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormContainer>
      <FormBodyContainer>{children}</FormBodyContainer>
    </FormContainer>
  );
};
