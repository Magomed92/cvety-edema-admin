import React from 'react';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PaperWrapper } from '../PaperWrapper';
import styles from './OrderInfoTable.module.scss';

export const OrderInfoTable = ({ delivery = 100, products, insulation }) => {
  let total = products?.reduce((acc, curr) => acc + +curr.price * curr.quantity, 0);
  insulation && (total = total + 100);

  return (
    <PaperWrapper>
      <Table className={styles.staffOrderInfoTable}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headText}>Продукт</TableCell>
            <TableCell className={styles.headText}>Цена</TableCell>
            <TableCell className={styles.headText}>Количество</TableCell>
            <TableCell className={styles.headText}>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="d-flex align-items-center">
                  <Avatar
                    className="mr-10"
                    src={`https://cvety-edema.ru${item.imageUrl}`}
                    style={{ borderRadius: 8 }}
                  />
                  <div className="d-flex flex-column">
                    <Typography className="fw-bold">{item.title}</Typography>
                    <div className="d-flex align-items-center">
                      <Typography className="text-color-600" component="span">
                        24
                      </Typography>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.price} руб.</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price * item.quantity} руб.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-20">
        <ul className="d-flex flex-column align-items-end">
          <li className="d-flex">
            <Typography component="span" className="fz-large-14 text-color-700">
              Сумма заказа:
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {total || 0} руб.
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              Цена доставки:
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {delivery || 0} руб.
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              Цена утеплителя:
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {insulation ? 100 : 0} руб.
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              Общая стоимость заказа:
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30 fw-bold">
              {total + delivery || 0} руб.
            </Typography>
          </li>
        </ul>
      </div>
    </PaperWrapper>
  );
};
