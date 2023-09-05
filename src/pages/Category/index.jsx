import React from 'react';
import axios from '../../core/axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import altImage from '../../components/UploadFile/altImage.png';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));
console.log('mode', process.env)
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'media',
    renderCell: (obj) => (
      <Link to={`/category/edit/${obj.id}`} style={{ width: '100%', height: '100%' }}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          src={obj.row?.mediaSrc ? `https://cvety-edema.ru/uploads/${obj.row?.mediaSrc}` : altImage}
        />
      </Link>),
    headerName: 'Фото',
    width: 100,
  },
  {
    field: 'name',
    renderCell: (obj) => (
      <Link
        style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
        to={`/category/edit/${obj.id}`}>
        {obj.value}
      </Link>
    ),
    headerName: 'Название',
    width: 130,
  },
];

const Category = () => {
  const [items, setItems] = React.useState([]);
  const [categoryIds, setCategoryIds] = React.useState([]);

  React.useEffect(() => {
    axios.get('/category').then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleSelectedCategory = (ids) => {
    setCategoryIds(ids);
  };

  const onDeleteCategory = () => {
    axios.delete(`/admin/category/${categoryIds.join(',')}`).then(() => {
      setItems((prev) => prev.filter((item) => !categoryIds.includes(item.id)));
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <div className="d-flex mb-20 justify-between ">
        <Link style={{ textDecoration: 'none' }} to="/category/create">
          <Button sx={{ textTransform: 'none' }} variant="outlined">
            Добавить категорию
          </Button>
        </Link>
        <Button
          sx={{ textTransform: 'none' }}
          onClick={onDeleteCategory}
          color="error"
          variant="outlined">
          Удалить категорию
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={handleSelectedCategory}
        />
      </div>
    </Box>
  );
};

export default Category;
