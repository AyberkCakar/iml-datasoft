import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';
import {
  CheckboxListContainer,
  CheckboxListHeader,
  CheckboxListSplitter,
  ListContainer
} from './_styles';
import { ICheckboxList, ICheckboxListData } from './_type';

export default function CheckboxList({
  data,
  title,
  defaultCheckedIds = [0],
  setCheckedIds,
  disabled = false
}: ICheckboxList) {
  const onCheckboxClick = (value: number | string) => {
    const currentIndex: number | string = defaultCheckedIds.indexOf(value);
    const newChecked: (number | string)[] = [...defaultCheckedIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedIds(newChecked);
  };

  return (
    <CheckboxListContainer>
      <CheckboxListHeader>{title}</CheckboxListHeader>
      <CheckboxListSplitter />
      <ListContainer>
        {data?.map((value: ICheckboxListData, index: number) => {
          const labelId: string = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              disablePadding
              sx={{ backgroundColor: index % 2 ? 'white' : '#e2e2e2' }}
            >
              <ListItemButton
                disabled={disabled}
                role={undefined}
                onClick={() => onCheckboxClick(value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={defaultCheckedIds.indexOf(value.id) !== -1}
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </ListContainer>
    </CheckboxListContainer>
  );
}
