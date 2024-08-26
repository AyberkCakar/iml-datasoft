import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { IDropdownOptions, IOption } from './_types';

export default function Dropdown({
  label,
  options,
  defaultOption,
  size = 'medium',
  labelSize = 'normal',
  style,
  valueChange
}: IDropdownOptions) {
  const [value, setValue] = React.useState<number | string | null>('');
  React.useEffect(() => {
    defaultOption && setValue(defaultOption);
  }, []);

  return (
    <FormControl style={style}>
      <InputLabel size={labelSize} id="demo-simple-select-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value as number);

          valueChange(e.target.value as number | string);
        }}
        size={size}
      >
        {options.map((option: IOption) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
