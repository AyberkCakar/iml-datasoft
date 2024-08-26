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
import { DELETE_ALGORITHM, GET_ALGORITHMS } from './_graphql';
import { IAlgorithm, IAlgorithmsResult } from './_types';
import { AlertMessage } from '../../alert';
import DeleteModal from '../../delete-modal';
import AddAlgorithmModal from './add-algorithm-modal';

function getLikeWhere(searchText: string): Record<string, any> {
  return {
    algorithmName: { _ilike: `%${searchText}%` }
  };
}

export default function Algorithms() {
  const { t } = useTranslation();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('general.id')
    },
    {
      field: 'algorithmName',
      headerName: t('algorithms.algorithmName'),
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

  const [rows, setData] = React.useState<IAlgorithm[]>([]);
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
  const [algorithm, setAlgorithm] = React.useState<IAlgorithm | null>(null);

  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);
  const [deleteAlgorithm] = useMutation(DELETE_ALGORITHM);

  const onEditClick = (id: GridRowId) => {
    const findData: IAlgorithm | undefined = rows.find(
      (data: IAlgorithm) => data.id === id
    );

    if (findData) {
      setAlgorithm({
        id: findData.id,
        algorithmName: findData.algorithmName
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

  const { data, error, refetch } = useQuery<IAlgorithmsResult>(GET_ALGORITHMS, {
    variables
  });

  const getFirstPage = () => {
    setPagination({
      page: 0,
      pageSize: pagination.pageSize
    });
  };

  const onDelete = () => {
    setOpenDeleteDialogState(false);

    deleteAlgorithm({
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
      setAlgorithm(null);
    }
  }, [addEditModalOpenState]);

  React.useEffect(() => {
    if (data) {
      setData(data.algorithms);
      setTotalCount(data.algorithms_aggregate.aggregate.count);
    } else if (error) {
    }
  }, [data, error]);

  return (
    <PageContainer pageIcon="fa-robot" pageTitle={t('algorithms.pageTitle')}>
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
          addButtonLabel={t('algorithms.addAlgorithm')}
          onAddClick={() => {
            setAddEditModalOpenState(true);
          }}
        ></Datatable>
      </FormCard>
      <AddAlgorithmModal
        openState={addEditModalOpenState}
        onClose={() => {
          setAddEditModalOpenState(false);
          setAlgorithm(null);
        }}
        saveResponse={(success: boolean) => {
          setAddEditModalOpenState(!success);
          setAlgorithm(null);
          getFirstPage();
          refetch({ variables });
        }}
        algorithm={algorithm}
      ></AddAlgorithmModal>
      <DeleteModal
        openState={openDeleteDialogState}
        onClose={() => setOpenDeleteDialogState(false)}
        onDeleteClick={() => onDelete()}
        modalInfo={{
          title: t('algorithms.deleteModal.title'),
          description: t('algorithms.deleteModal.description')
        }}
      ></DeleteModal>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess
            ? t('algorithms.deleteModal.successMessage')
            : t('algorithms.deleteModal.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </PageContainer>
  );
}
