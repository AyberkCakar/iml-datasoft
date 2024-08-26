export interface IDropdownOptions {
  label: string;
  options: IOption[];
  defaultOption?: number | string | null;
  size?: 'small' | 'medium';
  labelSize?: 'normal' | 'small';
  style?: React.CSSProperties;
  valueChange: (id: number | string) => void;
}

export interface IOption {
  id: number | string;
  name: string;
}
