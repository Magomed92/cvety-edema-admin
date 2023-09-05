import { IconButton } from '@mui/material';

import { Link } from 'react-router-dom';

import styles from './ProductHeader.module.scss';

export const ProductHeader = ({ backUrl, title }) => {
  return (
    <div className="mb-20">
      <Link to={backUrl}>
        <IconButton variant="outlined" className={styles.btn}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 13L1 7L8 1"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </Link>
      <span className="ml-10">{title}</span>
    </div>
  );
};
