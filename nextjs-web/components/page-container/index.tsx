import React from 'react';
import { Container, HeaderContainer, HeaderIcon, HeaderTitle } from './_styles';
import { IPageContainer } from './_types';
import { NextSeo } from 'next-seo';
import { useTranslation } from '../../hooks/useTranslation';

export const PageContainer = ({
  pageTitle,
  pageIcon,
  children,
  baseClassName = 'fa-solid'
}: IPageContainer) => {
  const { t } = useTranslation();

  return (
    <Container>
      <NextSeo title={t('header.mergeTitle') + ' - ' + pageTitle} />
      <HeaderContainer>
        <HeaderTitle>{pageTitle}</HeaderTitle>
        <HeaderIcon baseClassName={baseClassName} className={pageIcon} />
      </HeaderContainer>
      {children}
    </Container>
  );
};
