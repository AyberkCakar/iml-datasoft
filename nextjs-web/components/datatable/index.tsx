import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import {
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import { GridSortItem } from '@mui/x-data-grid/models/gridSortModel';
import { IDatatable } from './_type';
import {
  AddButton,
  Container,
  DataGridConteiner,
  Header,
  SearchFormControl
} from './_style';
import { useTranslation } from '../../hooks/useTranslation';

export const Datatable = ({
  columns,
  data,
  onPaginationChange,
  onSortChange,
  isServerSide = true,
  isSearchable = false,
  onSearchChange,
  isAddButton = false,
  onAddClick,
  addButtonLabel = 'Add',
  totalDataCount = 0,
  pagination
}: IDatatable) => {
  const { t } = useTranslation();

  const [currentPagination, setCurrentPagination] =
    React.useState<GridPaginationModel>({
      pageSize: 10,
      page: 0
    });

  React.useEffect(() => {
    pagination && setCurrentPagination(pagination);
  }, [pagination]);

  const defaultSort: GridSortItem = {
    field: 'id',
    sort: 'asc'
  };

  const [sort, setSort] = React.useState<GridSortItem>(defaultSort);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    onPaginationChange && onPaginationChange(currentPagination);
  }, [onPaginationChange, currentPagination]);

  React.useEffect(() => {
    onSortChange && onSortChange(sort);
  }, [onSortChange, sort]);

  React.useEffect(() => {
    onSearchChange && onSearchChange(searchText);
  }, [onSearchChange, searchText]);

  return (
    <Container>
      <Header
        style={{ justifyContent: isAddButton ? 'space-between' : 'flex-end' }}
      >
        <AddButton
          variant="outlined"
          color="success"
          startIcon={<Add />}
          isAddButton={isAddButton}
          onClick={() => {
            if (onAddClick) {
              onAddClick();
            }
          }}
        >
          {addButtonLabel.charAt(0).toUpperCase() + addButtonLabel.slice(1)}
        </AddButton>
        <SearchFormControl
          size={'small'}
          style={{ display: isSearchable ? 'block' : 'none' }}
        >
          <InputLabel htmlFor="filled-adornment-search">
            {t('general.search')}
          </InputLabel>
          <OutlinedInput
            id="filled-adornment-search"
            onChange={(e) => setSearchText(e.target?.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => {
                    if (onSearchChange) {
                      onSearchChange(searchText);
                    }
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </SearchFormControl>
      </Header>
      <DataGridConteiner>
        <DataGrid
          onSortModelChange={(model) => {
            if (model.length > 0) {
              const field = model[0].field;
              const sortDirection = model[0].sort;
              setSort({ field, sort: sortDirection });
            } else {
              setSort(defaultSort);
            }
          }}
          rowHeight={50}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          rows={data}
          columns={columns}
          paginationMode={isServerSide ? 'server' : 'client'}
          paginationModel={currentPagination}
          onPaginationModelChange={setCurrentPagination}
          pageSizeOptions={[10, 25, 50, 100]}
          rowCount={totalDataCount}
        />
      </DataGridConteiner>
    </Container>
  );
};
