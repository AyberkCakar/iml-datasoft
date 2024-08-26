import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Datatable } from '../../datatable';
import { FormCard } from '../../form-card';
import { PageContainer } from '../../page-container';
import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowId,
  GridSortItem
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { IVariable } from '../../../models/variable';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_REAL_DATASET, GET_REAL_DATASETS } from './_graphql';
import { IRealDataset, IRealDatasetsResult } from './_types';
import { AlertMessage } from '../../alert';
import DeleteModal from '../../delete-modal';
import AddRealDatasetModal from './add-real-dataset-modal';

function getLikeWhere(searchText: string): Record<string, any> {
  return {
    datasetName: { _ilike: `%${searchText}%` }
  };
}

export default function RealDataset() {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('general.id')
    },
    {
      field: 'datasetName',
      headerName: t('realDataset.datasetName'),
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('general.actions'),
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={'edit'}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => onEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={'delete'}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  const [rows, setData] = React.useState<IRealDataset[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const [pagination, setPagination] = React.useState<GridPaginationModel>({
    pageSize: 10,
    page: 0
  });
  const [searchText, setSearchText] = React.useState<string>('');
  const [sort, setSort] = React.useState<GridSortItem | null>({
    field: 'id',
    sort: 'asc'
  });

  const [addEditModalOpenState, setAddEditModalOpenState] =
    React.useState<boolean>(false);
  const [openDeleteDialogState, setOpenDeleteDialogState] =
    React.useState<boolean>(false);
  const [realDataset, setRealDataset] = React.useState<IRealDataset | null>(
    null
  );

  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [deleteRealDataset] = useMutation(DELETE_REAL_DATASET);

  const onEditClick = (id: GridRowId) => {
    const findData: IRealDataset | undefined = rows.find(
      (data: IRealDataset) => data.id === id
    );

    if (findData) {
      setRealDataset({
        id: findData.id,
        datasetName: findData.datasetName
      });
      setAddEditModalOpenState(true);
    }
  };

  const onDeleteClick = (id: GridRowId) => {
    setSelectedRowId(id as number);
    setOpenDeleteDialogState(true);
  };

  const variables = React.useMemo(() => {
    let vars: IVariable = {
      offset: pagination.page * pagination.pageSize,
      limit: pagination.pageSize
    };
    if (searchText !== '') {
      vars = {
        ...vars,
        where: getLikeWhere(searchText)
      };
    }

    if (sort) {
      vars = {
        ...vars,
        order_by: [{ [sort?.field]: sort?.sort }]
      };
    }
    return vars;
  }, [pagination, searchText, sort]);

  const { data, error, refetch } = useQuery<IRealDatasetsResult>(
    GET_REAL_DATASETS,
    {
      variables
    }
  );

  const getFirstPage = () => {
    setPagination({
      page: 0,
      pageSize: pagination.pageSize
    });
  };

  const onDelete = () => {
    setOpenDeleteDialogState(false);

    deleteRealDataset({
      variables: {
        id: selectedRowId
      }
    })
      .then(() => {
        setAlertSuccess(true);
      })
      .catch(() => {
        setAlertSuccess(false);
      })
      .finally(() => {
        getFirstPage();
        setAlertOpen(true);
        setSelectedRowId(null);
        refetch({ variables });
      });
  };

  React.useEffect(() => {
    if (!addEditModalOpenState) {
      setRealDataset(null);
    }
  }, [addEditModalOpenState]);

  React.useEffect(() => {
    if (data) {
      setData(data.real_datasets);
      setTotalCount(data.real_datasets_aggregate.aggregate.count);
    } else if (error) {
    }
  }, [data, error]);

  return (
    <PageContainer
      pageIcon="fa-database"
      pageTitle={t('realDataset.pageTitle')}
    >
      <FormCard>
        <Datatable
          columns={columns}
          data={rows}
          totalDataCount={totalCount}
          isSearchable={true}
          onPaginationChange={(pagination: GridPaginationModel) => {
            setPagination(pagination);
          }}
          onSearchChange={(searchText: string) => {
            setSearchText(searchText);
          }}
          onSortChange={(sort: GridSortItem | null) => {
            setSort(sort);
          }}
          isAddButton={true}
          addButtonLabel={t('realDataset.addRealDataset')}
          onAddClick={() => {
            setAddEditModalOpenState(true);
          }}
        ></Datatable>
      </FormCard>
      <AddRealDatasetModal
        openState={addEditModalOpenState}
        onClose={() => {
          setAddEditModalOpenState(false);
          setRealDataset(null);
        }}
        saveResponse={(success: boolean) => {
          setAddEditModalOpenState(!success);
          setRealDataset(null);
          getFirstPage();
          refetch({ variables });
        }}
        realDataset={realDataset}
      ></AddRealDatasetModal>
      <DeleteModal
        openState={openDeleteDialogState}
        onClose={() => setOpenDeleteDialogState(false)}
        onDeleteClick={() => onDelete()}
        modalInfo={{
          title: t('realDataset.deleteModal.title'),
          description: t('realDataset.deleteModal.description')
        }}
      ></DeleteModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? t('realDataset.deleteModal.successMessage')
            : t('realDataset.deleteModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </PageContainer>
  );
}
