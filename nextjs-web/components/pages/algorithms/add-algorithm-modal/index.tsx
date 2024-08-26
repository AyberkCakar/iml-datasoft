import * as React from 'react';
import { useMutation } from '@apollo/client';
import { FormModal } from '../../../modal';
import { useTranslation } from '../../../../hooks/useTranslation';
import { IAddAlgorithmVariable, IAddAlgorithmModal } from './_types';
import { IAlgorithm } from '../_types';
import { ADD_ALGORITHM, UPDATE_ALGORITHM } from './_graphql';
import { InputGroup, ModalInput } from './_styles';
import { AlertMessage } from '../../../alert';

export default function AddAlgorithmModal({
  openState,
  onClose,
  saveResponse,
  algorithm
}: IAddAlgorithmModal) {
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const defaultAlgorithm: IAlgorithm = {
    id: 0,
    algorithmName: ''
  };

  const [algorithmRequest, setAlgorithmRequest] =
    React.useState<IAlgorithm | null>(defaultAlgorithm);

  React.useEffect(() => {
    setAlgorithmRequest(algorithm);
  }, [algorithm]);

  const handleClose = () => {
    if (onClose) {
      setAlgorithmRequest(defaultAlgorithm);
      onClose();
    }
  };

  const [addAlgorithm] = useMutation(
    algorithm ? UPDATE_ALGORITHM : ADD_ALGORITHM
  );

  const handleSave = () => {
    if (!algorithmRequest) {
      return;
    }

    let variables: IAddAlgorithmVariable = {
      algorithm: { algorithmName: algorithmRequest.algorithmName }
    };

    if (algorithm) {
      variables = { ...variables, id: algorithmRequest.id };
    }

    addAlgorithm({
      variables
    })
      .then(() => {
        setAlertSuccess(true);
        saveResponse(true);
      })
      .catch(() => {
        setAlertSuccess(false);
        saveResponse(false);
        setAlertOpen(true);
      })
      .finally(() => {
        setAlgorithmRequest(defaultAlgorithm);
        setAlertOpen(true);
      });
  };

  return (
    <>
      <FormModal
        onSave={() => handleSave()}
        openState={openState}
        onClose={handleClose}
        modalTitle={
          algorithm
            ? t('algorithms.editModal.title')
            : t('algorithms.addModal.title')
        }
      >
        <InputGroup>
          <ModalInput
            style={{
              marginRight: algorithm ? '0' : '20px'
            }}
            label={t('algorithms.algorithmName')}
            name="algorithmName"
            variant="outlined"
            fullWidth
            size={'small'}
            required={true}
            value={algorithmRequest?.algorithmName}
            onChange={(e) =>
              setAlgorithmRequest({
                ...algorithmRequest,
                algorithmName: e.target?.value
              })
            }
          />
        </InputGroup>
      </FormModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? algorithm
              ? t('algorithms.editModal.successMessage')
              : t('algorithms.addModal.successMessage')
            : algorithm
              ? t('algorithms.editModal.errorMessage')
              : t('algorithms.addModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
