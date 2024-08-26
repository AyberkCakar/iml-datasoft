import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import {
  GridRowsProp,
  GridValidRowModel
} from '@mui/x-data-grid/models/gridRows';
import { GridSortItem } from '@mui/x-data-grid/models/gridSortModel';

export interface IDatatable<R extends GridValidRowModel = any> {
  data: GridRowsProp<R>;
  columns: GridColDef[];
  totalDataCount: number;
  onPaginationChange?: (pagination: GridPaginationModel) => void;
  onSortChange?: (sort: GridSortItem | null) => void;
  isServerSide?: boolean;
  isSearchable?: boolean;
  onSearchChange?: (searchText: string) => void;
  isAddButton?: boolean;
  onAddClick?: () => void;
  addButtonLabel?: string;
  pagination?: GridPaginationModel;
}

export interface IAddButtonProps {
  isAddButton?: boolean;
}
