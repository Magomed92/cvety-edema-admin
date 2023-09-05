import React from 'react';
import styles from './InputComponent.module.scss';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';

const InputComponent = ({ prefix, error, name, label, multiline, inputType = 'text' }) => {
  const { control } = useFormContext();

  return (
    <div className={styles.root}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl error={!!error} variant="standard" fullWidth>
            <TextField
              multiline={multiline}
              type={inputType}
              {...field}
              value={field.value || ''}
              id="outlined-basic"
              label={label}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
              }}
            />
            {!!error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};

export default InputComponent;
