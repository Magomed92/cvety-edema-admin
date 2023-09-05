import React from "react";

import axios from "../../../core/axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import altImage from '../../../components/UploadFile/altImage.png';

export const Statuses = {
  ACTIVE: "Активный",
  DISABLED: "Отключенный",
};

export const statusColor = (status) => {
  const color = {
    DISABLED: "orange",
    ACTIVE: "rgb(12, 197, 12)",
  };
  return color[status];
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: 'media',
    renderCell: (obj) => (
      <Link to={`/promo/edit/${obj.id}`} style={{ width: '100%', height: '100%' }}>
        <img
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          src={obj.row?.mediaSrc ? `https://cvety-edema.ru/uploads/${obj.row?.mediaSrc}` : altImage}
        />
      </Link>),
    headerName: 'Фото',
    width: 100,
  },
  {
    field: "name",
    renderCell: (obj) => (
      <Link
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        to={`/promo/edit/${obj.id}`}
      >
        {obj.value}
      </Link>
    ),
    headerName: "Имя",
    width: 130,
  },
  {
    field: "expirationDate",
    renderCell: (obj) => (
      <Link
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        to={`/promo/edit/${obj.id}`}
      >
        {new Date(obj.value).toLocaleString("ru", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          timezone: "UTC",
        })}
      </Link>
    ),
    headerName: "Время завершения акции",
    width: 230,
  },
  { field: "value", headerName: "Скидка %", width: 100 },
  {
    field: "status",
    renderCell: (obj) => (
      <Link
        style={{
          cursor: "pointer",
          textDecoration: "none",
          width: "100%",
          color: statusColor(obj.value),
        }}
        to={`/orders/edit/${obj.id}`}
      >
        <div>{Statuses[obj.value]}</div>
      </Link>
    ),
    headerName: "Статус",
    width: 230,
  },
];

export const PromoList = () => {
  const [items, setItems] = React.useState([]);
  const [promoIds, setPromoIds] = React.useState([]);

  React.useEffect(() => {
    axios.get("/admin/promo").then((res) => {
      setItems(res.data.items);
    });
  }, []);

  const handleSelectedPromos = (ids) => {
    setPromoIds(ids);
  };

  const onDeletePromos = () => {
    axios.delete(`/admin/promo/${promoIds}`).then(() => {
      setItems((prev) => prev.filter((item) => !promoIds.includes(item.id)));
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <div className="mb-20 d-flex justify-between ">
        <Link style={{ textDecoration: "none" }} to="/promo/create">
          <Button sx={{ textTransform: "none" }} variant="outlined">
            Добавить промо код
          </Button>
        </Link>
        <Button
          sx={{ textTransform: "none" }}
          onClick={onDeletePromos}
          variant="outlined"
          color="error"
        >
          Удалить промо код
        </Button>
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rowCount={30}
          rows={items}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          checkboxSelection
          onSelectionModelChange={handleSelectedPromos}
        />
      </div>
    </Box>
  );
};
