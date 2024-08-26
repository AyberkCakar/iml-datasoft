import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { AddDataGeneratorButtonContainer, CancelButton } from './_styles';
import CheckboxList from '../../checkbox-list';
import {
  ADD_SIMULATOR,
  ADD_SIMULATOR_PARAMETERS,
  GET_FAILURE_TYPES,
  GET_SIMULATOR,
  UPDATE_SIMULATOR
} from './_graphql';
import { useMutation, useQuery } from '@apollo/client';
import { IFailureType, IFailureTypesResult } from '../anomaly-types/_model';
import { ICheckboxListData } from '../../checkbox-list/_type';
import { AlertMessage } from '../../alert';
import { initializeApollo } from '../../../lib/apolloClient';
import {
  IDataGenerator,
  IDataGeneratorParameters,
  IDataGeneratorRequest
} from '../data-generator/_types';
import { PageContainer } from '../../page-container';
import { FormCard } from '../../form-card';
import { InputField, SaveButton } from '../../form-card/styles';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx: any) => {
  const dataGeneratorId: number = ctx.query?.dataGeneratorId as number;
  const apolloClient = initializeApollo();
  const {
    data: { simulators_by_pk: dataGenerator }
  } = await apolloClient.query({
    query: GET_SIMULATOR,
    variables: { id: dataGeneratorId }
  });

  return { props: { dataGenerator } };
};

export default function AddDataGeneratorPage({
  dataGenerator
}: {
  dataGenerator?: IDataGenerator;
}) {
  const router = useRouter();
  const isSimulatorEdit: boolean = !!dataGenerator;
  const { t } = useTranslation();
  const [simulatorRequest, setSimulatorRequest] = React.useState<IDataGenerator>({
    simulatorName: '',
    minExpectedTemperatureValue: '',
    maxExpectedTemperatureValue: '',
    minExpectedSoundValue: '',
    maxExpectedSoundValue: '',
    minExpectedVibrationValue: '',
    maxExpectedVibrationValue: ''
  });

  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [checkboxListData, setCheckboxListData] = React.useState<
    ICheckboxListData[]
  >([]);

  const [checkedIds, setCheckedIds] = React.useState<(number | string)[]>([]);

  const { data, error } = useQuery<IFailureTypesResult>(GET_FAILURE_TYPES);

  const [addSimulator] = useMutation(
    isSimulatorEdit ? UPDATE_SIMULATOR : ADD_SIMULATOR
  );
  const [addSimulatorParameters] = useMutation(ADD_SIMULATOR_PARAMETERS);

  React.useEffect(() => {
    if (dataGenerator) {
      setSimulatorRequest({
        simulatorName: dataGenerator.simulatorName,
        minExpectedTemperatureValue: dataGenerator.minExpectedTemperatureValue,
        maxExpectedTemperatureValue: dataGenerator.maxExpectedTemperatureValue,
        minExpectedSoundValue: dataGenerator.minExpectedSoundValue,
        maxExpectedSoundValue: dataGenerator.maxExpectedSoundValue,
        minExpectedVibrationValue: dataGenerator.minExpectedVibrationValue,
        maxExpectedVibrationValue: dataGenerator.maxExpectedVibrationValue
      });

      const defaultCheckIds = dataGenerator?.simulator_parameters
        ? dataGenerator?.simulator_parameters.map(
            (parameter: IDataGeneratorParameters) => parameter.failureTypeId
          )
        : [];

      setCheckedIds(defaultCheckIds);
    }
  }, [dataGenerator]);

  const onSaveClick = () => {
    let variables: IDataGeneratorRequest = {
      simulator: {
        simulatorName: simulatorRequest.simulatorName,
        minExpectedTemperatureValue:
          simulatorRequest.minExpectedTemperatureValue,
        maxExpectedTemperatureValue:
          simulatorRequest.maxExpectedTemperatureValue,
        minExpectedSoundValue: simulatorRequest.minExpectedSoundValue,
        maxExpectedSoundValue: simulatorRequest.maxExpectedSoundValue,
        minExpectedVibrationValue: simulatorRequest.minExpectedVibrationValue,
        maxExpectedVibrationValue: simulatorRequest.maxExpectedVibrationValue,
        anomalyCount: simulatorRequest.anomalyCount,
        dataCount: simulatorRequest.dataCount
      }
    };

    if (isSimulatorEdit) {
      variables = {
        ...variables,
        id: dataGenerator?.id as number
      };
    }

    addSimulator({ variables })
      .then((result) => {
        const simulatorParameters: IDataGeneratorParameters[] = checkedIds.map(
          (id: number | string) => {
            return {
              simulatorId: result.data.insert_simulators_one.id as number,
              failureTypeId: id as number
            };
          }
        );
        setAlertSuccess(true);

        if (!isSimulatorEdit) {
          addSimulatorParameters({
            variables: {
              simulatorParameters
            }
          })
            .then((result) => {
              setAlertSuccess(true);

              if (!isSimulatorEdit) {
                setSimulatorRequest({
                  simulatorName: '',
                  minExpectedTemperatureValue: '',
                  maxExpectedTemperatureValue: '',
                  minExpectedSoundValue: '',
                  maxExpectedSoundValue: '',
                  minExpectedVibrationValue: '',
                  maxExpectedVibrationValue: '',
                  dataCount: '',
                  anomalyCount: ''
                });
                setCheckedIds([]);
              }
            })
            .catch((error) => {
              setAlertSuccess(false);
            })
            .finally(() => {
              setAlertOpen(true);
            });
        } else {
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setAlertSuccess(false);
        setAlertOpen(true);
      });
  };

  React.useEffect(() => {
    if (data) {
      const formattedCheckboxListData: ICheckboxListData[] = data.failure_types
        ? data.failure_types.map((failureType: IFailureType) => {
            return {
              id: failureType.id as number,
              name: failureType.failureName as string
            };
          })
        : [];

      setCheckboxListData(formattedCheckboxListData);
    } else if (error) {
    }
  }, [data, error]);

  return (
    <PageContainer
      pageIcon="fa-server"
      pageTitle={
        isSimulatorEdit
          ? t('simulator.editDataGenerator')
          : t('simulator.addDataGenerator')
      }
    >
      <FormCard>
        <InputField
          label={t('simulator.simulatorName')}
          variant="outlined"
          fullWidth
          size="small"
          value={simulatorRequest?.simulatorName}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              simulatorName: e.target?.value
            })
          }
        />
        <InputField
          label={t('simulator.dataCount')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.dataCount}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              dataCount: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.anomalyCount')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.anomalyCount}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              anomalyCount: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.minExpectedTemperatureValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.minExpectedTemperatureValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              minExpectedTemperatureValue: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.maxExpectedTemperatureValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.maxExpectedTemperatureValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              maxExpectedTemperatureValue: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.minExpectedSoundValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.minExpectedSoundValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              minExpectedSoundValue: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.maxExpectedSoundValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.maxExpectedSoundValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              maxExpectedSoundValue: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.minExpectedVibrationValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.minExpectedVibrationValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              minExpectedVibrationValue: Number(e.target?.value)
            })
          }
        />
        <InputField
          label={t('simulator.maxExpectedVibrationValue')}
          variant="outlined"
          fullWidth
          size="small"
          type="number"
          value={simulatorRequest?.maxExpectedVibrationValue}
          onChange={(e) =>
            setSimulatorRequest({
              ...simulatorRequest,
              maxExpectedVibrationValue: Number(e.target?.value)
            })
          }
        />
        <CheckboxList
          data={checkboxListData}
          title={t('simulator.checkBoxListTitle')}
          disabled={isSimulatorEdit}
          defaultCheckedIds={checkedIds}
          setCheckedIds={(checkedIds: (number | string)[]) =>
            setCheckedIds(checkedIds)
          }
        ></CheckboxList>
        <AddDataGeneratorButtonContainer>
          <SaveButton onClick={() => onSaveClick()}>
            {isSimulatorEdit
              ? t('general.saveChanges')
              : t('simulator.generateSimulatorData')}
          </SaveButton>
          {isSimulatorEdit ? (
            <CancelButton onClick={() => router.replace('/data-generator')}>
              {t('general.cancel')}
            </CancelButton>
          ) : (
            ''
          )}
        </AddDataGeneratorButtonContainer>
      </FormCard>
      <AlertMessage
        openState={alertOpen}
        description={
          isSimulatorEdit
            ? alertSuccess
              ? t('simulator.editSuccessMessage')
              : t('simulator.editErrorMessage')
            : alertSuccess
              ? t('simulator.addSuccessMessage')
              : t('simulator.addErrorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </PageContainer>
  );
}
