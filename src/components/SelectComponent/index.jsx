import React from 'react';
import styles from './SelectComponent.module.scss';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller, useFormContext } from 'react-hook-form';

const SelectComponent = ({ name, items, error, label, emptyText }) => {
  const { control } = useFormContext();
  return (
    <div className={styles.root}>
      <Box sx={{ minWidth: 120 }}>
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl error={!!error} fullWidth>
              <InputLabel id="demo-simple-select-label">{label}</InputLabel>
              <Select
                {...field}
                value={field.value || 0}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={label}>
                {emptyText && (
                  <MenuItem value={0}>
                    <i>{emptyText}</i>
                  </MenuItem>
                )}
                {items.map((el) => (
                  <MenuItem value={el.id}>{el.name}</MenuItem>
                ))}
              </Select>
              {!!error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
            </FormControl>
          )}
        />
      </Box>
    </div>
  );
};

export default SelectComponent;
