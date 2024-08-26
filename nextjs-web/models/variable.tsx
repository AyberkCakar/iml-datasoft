import { GridSortDirection } from '@mui/x-data-grid';

export interface IVariable {
  offset?: number;
  limit?: number;
  where?: Record<string, any>;
  order_by?: [{ [x: string]: GridSortDirection }];
}
