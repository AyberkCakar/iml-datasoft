import React, { ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { FormModal } from '../../../modal';
import { useTranslation } from '../../../../hooks/useTranslation';
import { IAddRealDatasetVariable, IAddRealDatasetModal } from './_types';
import { IRealDataset } from '../_types';
import { ADD_DATASET, ADD_REAL_DATASET, UPDATE_REAL_DATASET } from './_graphql';
import { InputGroup, ModalInput, VisuallyHiddenInput } from './_styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AlertMessage } from '../../../alert';

export default function AddRealDatasetModal({
  openState,
  onClose,
  saveResponse,
  realDataset
}: IAddRealDatasetModal) {
  const [fileContent, setFileContent] = React.useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setFileContent(text as string);
      };
      reader.readAsText(file);
    }
  };

  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const defaultRealDataset: IRealDataset = {
    id: 0,
    datasetName: ''
  };

  const [realDatasetRequest, setRealDatasetRequest] =
    React.useState<IRealDataset | null>(defaultRealDataset);

  React.useEffect(() => {
    setRealDatasetRequest(realDataset);
  }, [realDataset]);

  const handleClose = () => {
    if (onClose) {
      setRealDatasetRequest(defaultRealDataset);
      onClose();
    }
  };

  const [addRealDataset] = useMutation(
    realDataset ? UPDATE_REAL_DATASET : ADD_REAL_DATASET
  );

  const [addDataset] = useMutation(ADD_DATASET);

  const handleSave = () => {
    if (!realDatasetRequest) {
      return;
    }

    let variables: IAddRealDatasetVariable = {
      realDataset: { datasetName: realDatasetRequest.datasetName }
    };

    if (realDataset) {
      variables = { ...variables, id: realDatasetRequest.id };
    }

    addRealDataset({
      variables
    })
      .then((response) => {
        if (!realDataset) {
          addDataset({
            variables: {
              dataset: {
                simulatorId: null,
                realDatasetId: response.data.insert_real_datasets_one.id,
                result: JSON.parse(fileContent as string)
              }
            }
          })
            .then(() => {
              setAlertSuccess(true);
              saveResponse(true);
            })
            .catch(() => {
              setAlertSuccess(false);
              saveResponse(false);
            })
            .finally(() => {
              setAlertOpen(true);
              setRealDatasetRequest(defaultRealDataset);
            });
        } else {
          setAlertSuccess(true);
          saveResponse(true);
        }
      })
      .catch(() => {
        setAlertSuccess(false);
        saveResponse(false);
        setAlertOpen(true);
        setRealDatasetRequest(defaultRealDataset);
      });
  };

  return (
    <>
      <FormModal
        onSave={() => handleSave()}
        openState={openState}
        onClose={handleClose}
        modalTitle={
          realDataset
            ? t('realDataset.editModal.title')
            : t('realDataset.addModal.title')
        }
      >
        <InputGroup>
          <ModalInput
            style={{
              marginRight: realDataset ? '0' : '20px'
            }}
            label={t('realDataset.datasetName')}
            name="datasetName"
            variant="outlined"
            fullWidth
            size={'small'}
            required={true}
            value={realDatasetRequest?.datasetName}
            onChange={(e) =>
              setRealDatasetRequest({
                ...realDatasetRequest,
                datasetName: e.target?.value
              })
            }
          />
          <Button
            style={{
              minWidth: '250px',
              height: '40px',
              display: realDataset ? 'none' : 'flex'
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            {t('realDataset.uploadFile')}
            <VisuallyHiddenInput
              name="realData"
              onChange={handleFileChange}
              type="file"
              accept=".json"
            />
          </Button>
        </InputGroup>
      </FormModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? realDataset
              ? t('realDataset.editModal.successMessage')
              : t('realDataset.addModal.successMessage')
            : realDataset
            ? t('realDataset.editModal.errorMessage')
            : t('realDataset.addModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
