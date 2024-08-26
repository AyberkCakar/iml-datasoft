export interface ICheckboxList {
  data: ICheckboxListData[];
  title: string;
  defaultCheckedIds?: (number | string)[];
  disabled?: boolean;
  setCheckedIds: (checkedIds: (number | string)[]) => void;
}

export interface ICheckboxListData {
  id: number | string;
  name: string;
}
