import * as React from 'react';
import { ADD_FAILURE_TYPE, UPDATE_FAILURE_TYPE } from '../_graphql';
import { useMutation } from '@apollo/client';
import { FormModal } from '../../../modal';
import { InputGroup, ModalInput, GroupModalInput } from './_style';
import { IAddFailureTypeModal, IAddFailureVariable } from './_model';
import { IFailureType } from '../_model';
import { useTranslation } from '../../../../hooks/useTranslation';
import { AlertMessage } from '../../../alert';

export default function AddAnomalyTypeModal({
  openState,
  onClose,
  saveResponse,
  failureType
}: IAddFailureTypeModal) {
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const defaultFailureType: IFailureType = {
    id: 0,
    failureName: '',
    timeInterval: '',
    soundAnomalyMultiplier: '',
    vibrationAnomalyMultiplier: '',
    temperatureAnomalyMultiplier: ''
  };

  const [failureTypeRequest, setFailureTypeRequest] =
    React.useState<IFailureType | null>(defaultFailureType);

  React.useEffect(() => {
    setFailureTypeRequest(failureType);
  }, [failureType]);

  const handleClose = () => {
    if (onClose) {
      setFailureTypeRequest(defaultFailureType);
      onClose();
    }
  };

  const [addFailureType] = useMutation(
    failureType ? UPDATE_FAILURE_TYPE : ADD_FAILURE_TYPE
  );

  const handleSave = () => {
    if (!failureTypeRequest) {
      return;
    }

    let variables: IAddFailureVariable = { failureType: failureTypeRequest };

    if (failureType) {
      variables = { ...variables, id: failureTypeRequest.id };
    }

    delete variables.failureType?.id;

    addFailureType({
      variables
    })
      .then((result) => {
        setAlertSuccess(true);
        saveResponse(true);
      })
      .catch((error) => {
        setAlertSuccess(false);
        saveResponse(false);
      })
      .finally(() => {
        setFailureTypeRequest(defaultFailureType);
        setAlertOpen(true);
      });
  };

  return (
    <>
      <FormModal
        onSave={() => handleSave()}
        openState={openState}
        onClose={handleClose}
        modalTitle={t('failureTypes.addFailureType')}
      >
        <ModalInput
          name="failureName"
          label={t('failureTypes.failureName')}
          variant="outlined"
          fullWidth
          size={'small'}
          required={true}
          value={failureTypeRequest?.failureName}
          onChange={(e) =>
            setFailureTypeRequest({
              ...failureTypeRequest,
              failureName: e.target?.value
            })
          }
        />
        <InputGroup>
          <GroupModalInput
            label={t('failureTypes.timeInterval')}
            variant="outlined"
            name="timeInterval"
            fullWidth
            size={'small'}
            type="number"
            required={true}
            value={failureTypeRequest?.timeInterval}
            onChange={(e) =>
              setFailureTypeRequest({
                ...failureTypeRequest,
                timeInterval: Number(e.target?.value)
              })
            }
          />
          <ModalInput
            label={t('failureTypes.soundAnomalyMultiplier')}
            name="soundAnomalyMultiplier"
            variant="outlined"
            fullWidth
            size={'small'}
            type="number"
            required={true}
            value={failureTypeRequest?.soundAnomalyMultiplier}
            onChange={(e) =>
              setFailureTypeRequest({
                ...failureTypeRequest,
                soundAnomalyMultiplier: Number(e.target?.value)
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <GroupModalInput
            label={t('failureTypes.temperatureAnomalyMultiplier')}
            name="temperatureAnomalyMultiplier"
            variant="outlined"
            fullWidth
            size={'small'}
            type="number"
            required={true}
            value={failureTypeRequest?.temperatureAnomalyMultiplier}
            onChange={(e) =>
              setFailureTypeRequest({
                ...failureTypeRequest,
                temperatureAnomalyMultiplier: Number(e.target?.value)
              })
            }
          />
          <ModalInput
            label={t('failureTypes.vibrationAnomalyMultiplier')}
            name="vibrationAnomalyMultiplier"
            variant="outlined"
            fullWidth
            size={'small'}
            type="number"
            required={true}
            value={failureTypeRequest?.vibrationAnomalyMultiplier}
            onChange={(e) =>
              setFailureTypeRequest({
                ...failureTypeRequest,
                vibrationAnomalyMultiplier: Number(e.target?.value)
              })
            }
          />
        </InputGroup>
      </FormModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? failureType
              ? t('failureTypes.editModal.successMessage')
              : t('failureTypes.addModal.successMessage')
            : failureType
              ? t('failureTypes.editModal.errorMessage')
              : t('failureTypes.addModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
