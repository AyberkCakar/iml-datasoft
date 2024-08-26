import React from 'react';
import {
  AlgorithmCardContainer,
  AlgorithmCardBodyContainer,
  AlgorithmCardInformation,
  AlgorithmCardHeader,
  AlgorithmCardSplitter,
  AlgorithmCardContent,
  LoaderContainer
} from './_styles';
import { CircularProgress } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import { IFormattedAlgorithmResult } from '../pages/compare-algorithms/_types';

export const AlgorithmCard = ({
  data,
  isLoading
}: {
  data?: IFormattedAlgorithmResult;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <AlgorithmCardContainer>
      <AlgorithmCardBodyContainer>
        <AlgorithmCardContent>
          <AlgorithmCardHeader>{data?.algorithmName}</AlgorithmCardHeader>
          <AlgorithmCardSplitter></AlgorithmCardSplitter>
          {isLoading ? (
            <LoaderContainer>
              <CircularProgress size={60} />
            </LoaderContainer>
          ) : (
            <AlgorithmCardInformation>
              <span>
                <b>{t('algorithmCard.accuracy')}:</b> {data?.result?.accuracy}
              </span>
              <span>
                <b>{t('algorithmCard.f1')}:</b> {data?.result?.f1}
              </span>
              <span>
                <b>{t('algorithmCard.recall')}:</b> {data?.result?.recall}
              </span>
              <span>
                <b>{t('algorithmCard.precision')}:</b>
                {data?.result?.precision}
              </span>
            </AlgorithmCardInformation>
          )}
        </AlgorithmCardContent>
      </AlgorithmCardBodyContainer>
    </AlgorithmCardContainer>
  );
};
