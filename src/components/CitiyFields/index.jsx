import React from 'react';
import TextField from '@mui/material/TextField';
import styles from './CityFields.module.scss';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const CityFields = ({ index, name, price, onChange, onRemove }) => {
  return (
    <div className={styles.root}>
      <TextField
        onChange={(e) => onChange(index, 'name', e.target.value)}
        value={name}
        style={{ maxWidth: '160px' }}
        name="name"
        label="Город"
      />
      <TextField
        onChange={(e) => onChange(index, 'price', e.target.value)}
        style={{ maxWidth: '90px', marginLeft: '20px' }}
        inputType="number"
        name="price"
        label="Цена "
        value={price}
      />
      <CancelPresentationIcon
        onClick={() => onRemove(index)}
        style={{
          maxWidth: '30px',
          flexDirection: 'inlineBlock',
          cursor: 'pointer',
          position: 'absolute',
          marginLeft: '280px',
        }}
      />
      {name && price ? '' : <p style={{ color: 'red' }}>Одно из полей не заполнено</p>}
    </div>
  );
};
export default CityFields;
