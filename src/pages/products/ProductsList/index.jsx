import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './Product.module.scss';
import { Link } from 'react-router-dom';
import axios from '../../../core/axios';
import { Button } from '@mui/material';
import { statusColor, Statuses } from '../../promos/PromoList';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'media',
    renderCell: (obj) => (
      <Link to={`products/edit/${obj.id}`}>
        <img
          src={`https://cvety-edema.ru${obj.row?.media[0]?.url}`}
          alt={`Product image ${obj.id}`}
        />
      </Link>
    ),
    headerName: 'Фото',
    width: 100,
  },
  {
    field: 'title',
    renderCell: (obj) => (
      <Link
        style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
        to={`products/edit/${obj.id}`}>
        {obj.value}
      </Link>
    ),
    headerName: 'Название',
    width: 500,
  },
  { field: 'price', headerName: 'Цена', width: 200 },
  {
    field: 'status',
    renderCell: (obj) => (
      <Link
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          width: '100%',
          color: statusColor(obj.value),
        }}
        to={`/orders/edit/${obj.id}`}>
        <div>{Statuses[obj.value]}</div>
      </Link>
    ),
    headerName: 'Статус',
    width: 200,
  },
];

export const ProductsList = () => {
  const [items, setItems] = React.useState([]);
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    currentPage: 0,
    itemCount: 100,
    totalPages: 1
  })
  const [productIds, setProductIds] = React.useState([]);
  React.useEffect(() => {
    axios.get(`/admin/product?page=${meta?.currentPage || 1}&limit=100`).then((res) => {
      setItems(res.data.items);
      setMeta(prev => ({ ...prev, ...res.data.meta }))
    });
  }, [meta?.currentPage, meta?.itemCount]);

  const handleSelectedItems = (ids) => {
    setProductIds(ids);
  };
  const onDeleteItems = () => {
    axios.delete(`/admin/product/${productIds.join(',')}`).then(() => {
      setItems((prev) => prev.filter((item) => !productIds.includes(item.id)));
    });
  };

  return (
    <Box className={styles.box} component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <div className={styles.img} style={{ height: 700, width: '100%' }}>
        <div className="d-flex justify-between mb-20">
          <Link to="/products/create">
            <Button sx={{ textTransform: 'none' }} variant="outlined">
              Добавить товар
            </Button>
          </Link>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={onDeleteItems}
            color="error"
            variant="outlined">
            Удалить товар
          </Button>
        </div>
        <DataGrid
          rows={items}
          columns={columns}
          rowCount={meta?.totalItems}
          pageSize={meta?.itemCount}
          paginationMode="server"
          page={meta?.currentPage - 1}
          pagination
          onPageChange={(newPage) => {
            setMeta(prev => prev.totalPages > newPage && ({ ...prev, currentPage: newPage + 1 }))

          }}
          onPageSizeChange={(newPageSize) => {
            setMeta(prev => ({ ...prev, itemCount: newPageSize }))
          }}
          checkboxSelection
          onSelectionModelChange={handleSelectedItems}
        />
      </div>
    </Box>
  );
};
