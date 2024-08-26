import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { GET_ALGORITHM_SETTINGS, GET_ALGORITHM_RESULTS } from './_graphql';
import { useQuery } from '@apollo/client';
import { PageContainer } from '../../page-container';
import { FormCard } from '../../form-card';
import { IOption } from '../../dropdown/_types';
import Dropdown from '../../dropdown';
import {
  IAlgorithmResult,
  IAlgorithmResults,
  IAlgorithmSetting,
  IAlgorithmSettings,
  ICompareAlgorithmRequest,
  ICompareAlgorithmVariables,
  IFormattedAlgorithmResult
} from './_types';
import {
  AlgorithmCardContainer,
  AlgorithmContainer,
  CompareAlgorithmsBody,
  GetAlgorithmButtonContainer,
  VerticalLine
} from './_styles';
import { SaveButton } from '../../form-card/styles';
import { AlgorithmCard } from '../../algorithm-card';

export default function CompareAlgorithmsPage() {
  const { t } = useTranslation();
  const [dropdownData, setDropdownData] = React.useState<IOption[]>([]);
  const [algorithm1Result, setAlgorithm1Result] = React.useState<
    IFormattedAlgorithmResult[]
  >([]);
  const [algorithm2Result, setAlgorithm2Result] = React.useState<
    IFormattedAlgorithmResult[]
  >([]);
  const [isGetAlgorithmResultRequest, setIsGetAlgorithmResultRequest] =
    React.useState<boolean>(false);

  const defaultCompareAlgorithmRequest: ICompareAlgorithmRequest = {
    algorithmSettingId1: '',
    algorithmSettingId2: ''
  };

  const [compareAlgorithmReqeust, setCompareAlgorithmReqeust] =
    React.useState<ICompareAlgorithmRequest>(defaultCompareAlgorithmRequest);

  const { data, error } = useQuery<IAlgorithmSettings>(GET_ALGORITHM_SETTINGS);

  const getAlgorithm1Result = useQuery(GET_ALGORITHM_RESULTS, {
    skip: true,
    variables: {
      algorithmSettingId: 0
    }
  });

  const getAlgorithm2Result = useQuery(GET_ALGORITHM_RESULTS, {
    skip: true,
    variables: {
      algorithmSettingId: 0
    }
  });

  React.useEffect(() => {
    if (data) {
      const { algorithm_settings } = data;
      const allData: IOption[] = algorithm_settings.map(
        (algorithmSetting: IAlgorithmSetting) => {
          return {
            id: algorithmSetting.id as number,
            name: algorithmSetting.algorithmSettingName
          };
        }
      );
      setDropdownData(allData);
    } else if (error) {
    }
  }, [data, error]);

  const onClickGetAlgorithmResults = () => {
    setAlgorithm1Result([]);
    setAlgorithm2Result([]);

    setIsGetAlgorithmResultRequest(true);
    let variables: ICompareAlgorithmVariables = {
      algorithmSettingId: compareAlgorithmReqeust.algorithmSettingId1 as number
    };

    getAlgorithm1Result
      .refetch(variables)
      .then((response: IAlgorithmResults) => {
        if (response.data) {
          const data: IFormattedAlgorithmResult[] = formattedResults(response);
          setAlgorithm1Result(data);
        }
      });

    variables = {
      algorithmSettingId: compareAlgorithmReqeust.algorithmSettingId2 as number
    };

    getAlgorithm2Result
      .refetch(variables)
      .then((response: IAlgorithmResults) => {
        if (response?.data) {
          const data: IFormattedAlgorithmResult[] = formattedResults(response);
          setAlgorithm2Result(data);
        }
      });
  };

  const formattedResults = (response: IAlgorithmResults) => {
    return response.data.algorithm_results.map((result: IAlgorithmResult) => {
      console.log(result);
      return {
        id: result.id,
        algorithmName: result.algorithm.algorithmName,
        result: result.result
      };
    });
  };

  return (
    <PageContainer
      pageIcon="fa-check-double"
      pageTitle={t('compareAlgorithms.pageTitle')}
    >
      <FormCard>
        <GetAlgorithmButtonContainer>
          <SaveButton onClick={() => onClickGetAlgorithmResults()}>
            {t('compareAlgorithms.getAlgorithmResults')}
          </SaveButton>
        </GetAlgorithmButtonContainer>
        <CompareAlgorithmsBody>
          <AlgorithmContainer>
            <Dropdown
              style={{ width: '100%' }}
              size="small"
              labelSize="small"
              label={t('compareAlgorithms.algorithm1')}
              options={dropdownData}
              defaultOption={compareAlgorithmReqeust?.algorithmSettingId1}
              valueChange={(id: number | string) => {
                setCompareAlgorithmReqeust({
                  ...compareAlgorithmReqeust,
                  algorithmSettingId1: id as number
                });
              }}
            ></Dropdown>

            {algorithm1Result.length ? (
              <AlgorithmCardContainer>
                {algorithm1Result.map((result: IFormattedAlgorithmResult) => {
                  return (
                    <AlgorithmCard
                      key={result.id}
                      isLoading={result.result !== null ? false : true}
                      data={result}
                    ></AlgorithmCard>
                  );
                })}
              </AlgorithmCardContainer>
            ) : (
              ''
            )}
          </AlgorithmContainer>

          <VerticalLine />
          <AlgorithmContainer>
            <Dropdown
              style={{ width: '100%' }}
              size="small"
              labelSize="small"
              label={t('compareAlgorithms.algorithm2')}
              options={dropdownData}
              defaultOption={compareAlgorithmReqeust?.algorithmSettingId2}
              valueChange={(id: number | string) => {
                setCompareAlgorithmReqeust({
                  ...compareAlgorithmReqeust,
                  algorithmSettingId2: id as number
                });
              }}
            ></Dropdown>

            {algorithm2Result.length ? (
              <AlgorithmCardContainer>
                {algorithm2Result.map((result: IFormattedAlgorithmResult) => {
                  console.log(result);
                  return (
                    <AlgorithmCard
                      key={result.id}
                      isLoading={result.result !== null ? false : true}
                      data={result}
                    ></AlgorithmCard>
                  );
                })}
              </AlgorithmCardContainer>
            ) : (
              ''
            )}
          </AlgorithmContainer>
        </CompareAlgorithmsBody>
      </FormCard>
    </PageContainer>
  );
}
