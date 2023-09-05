import { Paper } from '@mui/material';
import React from 'react';

import styles from './PaperWrapper.module.scss';

export const PaperWrapper = ({ children }) => {
  return (
    <div className={styles.root}>
      <Paper variant="elevation">{children}</Paper>
    </div>
  );
};
