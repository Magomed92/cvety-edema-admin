import React from "react";
import { ProductHeader } from "../../../components/ProductHeader";
import styles from "./OrderInfo.module.scss";
import axios from "../../../core/axios";
import { useLocation } from "react-router-dom";
import { OrderInfoTable } from "../../../components/OrderInfoTable/OrderInfoTable";
import { PaperWrapper } from "../../../components/PaperWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const statuses = [
  { id: "COMPLETED", name: "Завершен" },
  { id: "PENDING", name: "Ожидание" },
  { id: "CANCELED", name: "Отменен" },
  { id: "REFUNDED", name: "Возврат" },
];

export const Statuses = {
  PENDING: "Ожидание",
  COMPLETED: "Завершен",
  REFUNDED: "Возврат",
  CANCELED: "Отменен",
};

const OrderInfo = () => {
  const [order, setOrder] = React.useState({});
  const [status, setStatus] = React.useState("");
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];

  React.useEffect(() => {
    axios.get(`/admin/order/${orderId}`).then((res) => {
      setOrder(res.data);
      setStatus(res.data.status);
    });
  }, [orderId]);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleClick = React.useCallback(() => {
    axios.patch(`/admin/order/${order.id}`, { status: status }).then((res) => {
      console.log({ res })
    })
  }, [order.id, status])

  return (
    <div className={styles.root}>
      <ProductHeader backUrl="/orders" title="Заказ" />
      <div className={styles.columns}>
        <OrderInfoTable
          products={order.products}
          delivery={order.deliveryPrice}
          insulation={order.insulation}
        />
        <PaperWrapper>
          <h3 style={{ marginTop: 0 }}>Статус Заказа</h3>
          <div className={styles.status}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Статус</InputLabel>

              <Select
                className={styles[status]}
                onChange={handleChangeStatus}
                value={status}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Статус"
              >
                {statuses.map((el) => (
                  <MenuItem className={styles[el.id]} key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              style={{
                color: "white",
                marginLeft: "10px",

                height: "",
              }}
              variant="contained"
              onClick={handleClick}
            >
              Сохранить
            </Button>
          </div>
          <h3>Имя получателя</h3>
          <p>{order.fullName}</p>
          <h3>Номер телефона получателя</h3>
          <p>{order.phone}</p>
          {order.user?.fullName && (
            <><h3>Имя заказчика</h3><p>{order.user?.fullName}</p></>
          )}
          {order.user?.phone && (
            <><h3>Телефон заказчика</h3><p>{order.user?.phone}</p></>
          )}
          <h3> Адрес доставки</h3>
          {order.street}
          <div>
            {order.apartmentNumber && "№ кв." + order.apartmentNumber}
            {order.floorNumber && "  этаж  " + order.floorNumber}
          </div>
          <h3>Время доставки</h3>
          <p>{order.time}</p>
          <h3>Дата доставки</h3>
          <p>{order.date}</p>
          <h3>Время создания заказа</h3>
          {new Date(order.created_at).toLocaleString("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timezone: "UTC",
          })}
        </PaperWrapper>
      </div>
    </div>
  );
};

export default OrderInfo;
