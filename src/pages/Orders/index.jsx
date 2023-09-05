import React from 'react';

import axios from '../../core/axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Statuses } from './OrderInfo';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const statusColor = (status) => {
  const color = {
    PENDING: 'orange',
    COMPLETED: 'rgb(12, 197, 12)',
    REFUNDED: 'rgb(249, 83, 83)',
    CANCELED: 'rgb(253, 54, 28)',
  };
  return color[status];
};

const columns = [
  {
    field: 'id',
    renderCell: (obj) => (
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
          cursor: 'pointer',
          width: '100%',
        }}
        to={`/orders/edit/${obj.id}`}>
        {obj.id}
      </Link>
    ),
    headerName: 'ID',
    width: 130,
  },
  {
    field: 'amount',
    renderCell: (obj) => (
      <Link
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          color: 'black',
          width: '100%',
        }}
        to={`/orders/edit/${obj.id}`}>
        {obj.value}
      </Link>
    ),
    headerName: 'Цена',
    width: 200,
  },
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

const Orders = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios.get('/admin/order').then((res) => {
      setItems(res.data);
    });

    setInterval(() => {
      axios.get('/admin/order').then((res) => {
        setItems(res.data);
      });
    }, 50000)
  }, []);




  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <div className="d-flex mb-20 justify-between "></div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={items} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </div>
    </Box>
  );
};

export default Orders;
