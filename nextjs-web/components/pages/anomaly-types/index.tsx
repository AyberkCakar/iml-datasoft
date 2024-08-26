import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import * as React from 'react';
import { GridSortItem } from '@mui/x-data-grid/models/gridSortModel';
import { DELETE_FAILURE_TYPE, GET_FAILURE_TYPES } from './_graphql';
import { Datatable } from '../../datatable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddAnomalyTypeModal from './add-modal';
import DeleteModal from '../../delete-modal';
import { useMutation } from '@apollo/client';
import { IFailureType, IFailureTypesResult } from './_model';
import { useTranslation } from '../../../hooks/useTranslation';
import { AlertMessage } from '../../alert';
import { IVariable } from '../../../models/variable';
import { PageContainer } from '../../page-container';
import { FormCard } from '../../form-card';

function getLikeWhere(searchText: string): Record<string, any> {
  return {
    failureName: { _ilike: `%${searchText}%` }
  };
}

export default function AnomalyTypesPage() {
  const { t } = useTranslation();
  const [rows, setData] = React.useState<IFailureType[]>([]);
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
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [failureType, setFailureType] = React.useState<IFailureType | null>(
    null
  );
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [deleteFailureType] = useMutation(DELETE_FAILURE_TYPE);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('failureTypes.id')
    },
    {
      field: 'failureName',
      headerName: t('failureTypes.failureName'),
      width: 200
    },
    {
      field: 'soundAnomalyMultiplier',
      headerName: t('failureTypes.soundAnomalyMultiplier'),
      type: 'number',
      width: 200
    },
    {
      field: 'temperatureAnomalyMultiplier',
      headerName: t('failureTypes.temperatureAnomalyMultiplier'),
      type: 'number',
      width: 200
    },
    {
      field: 'vibrationAnomalyMultiplier',
      headerName: t('failureTypes.vibrationAnomalyMultiplier'),
      type: 'number',
      width: 200
    },
    {
      field: 'timeInterval',
      headerName: t('failureTypes.timeInterval'),
      type: 'number',
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
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

  const onEditClick = (id: GridRowId) => {
    const findData: IFailureType | undefined = rows.find(
      (data: IFailureType) => data.id === id
    );

    if (findData) {
      setFailureType({
        id: findData.id,
        failureName: findData.failureName,
        timeInterval: findData.timeInterval,
        soundAnomalyMultiplier: findData.soundAnomalyMultiplier,
        vibrationAnomalyMultiplier: findData.vibrationAnomalyMultiplier,
        temperatureAnomalyMultiplier: findData.temperatureAnomalyMultiplier
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

  const { data, error, refetch } = useQuery<IFailureTypesResult>(
    GET_FAILURE_TYPES,
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

    deleteFailureType({
      variables: {
        id: selectedRowId
      }
    })
      .then(() => {
        setAlertSuccess(true);
      })
      .catch((error) => {
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
      setFailureType(null);
    }
  }, [addEditModalOpenState]);

  React.useEffect(() => {
    if (data) {
      setData(data.failure_types);
      setTotalCount(data.failure_types_aggregate.aggregate.count);
    } else if (error) {
    }
  }, [data, error]);

  return (
    <PageContainer pageIcon="fa-bug" pageTitle={t('failureTypes.pageTitle')}>
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
          addButtonLabel={t('failureTypes.addFailureType')}
          onAddClick={() => {
            setAddEditModalOpenState(true);
          }}
        ></Datatable>
      </FormCard>
      <AddAnomalyTypeModal
        openState={addEditModalOpenState}
        onClose={() => {
          setAddEditModalOpenState(false);
          setFailureType(null);
        }}
        saveResponse={(success: boolean) => {
          setAddEditModalOpenState(!success);
          setFailureType(null);
          getFirstPage();
          refetch({ variables });
        }}
        failureType={failureType}
      ></AddAnomalyTypeModal>
      <DeleteModal
        openState={openDeleteDialogState}
        onClose={() => setOpenDeleteDialogState(false)}
        onDeleteClick={() => onDelete()}
        modalInfo={{
          title: t('failureTypes.deleteModal.title'),
          description: t('failureTypes.deleteModal.description')
        }}
      ></DeleteModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? t('failureTypes.deleteModal.successMessage')
            : t('failureTypes.deleteModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </PageContainer>
  );
}
