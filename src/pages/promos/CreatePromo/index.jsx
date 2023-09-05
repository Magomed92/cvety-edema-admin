import { Button } from "@mui/material";
import { ru } from "date-fns/locale";
import axios from "../../../core/axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaperWrapper } from "../../../components/PaperWrapper";
import { ProductHeader } from "../../../components/ProductHeader";
import styles from "./PromoCode.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import InputComponent from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadFile from "../../../components/UploadFile/UploadFile";

const schema = yup
  .object({
    name: yup.string().required("Введите заголовок"),
    status: yup
      .string("Выберите статус")
      .typeError("Выберите статус")
      .required("Выберите статус"),
    value: yup
      .number()
      .positive("Скидка должна быть положительным числом")
      .integer("Скидка должна быть целым числом")
      .max(99, "Скидка не может быть больше 99")
      .min(1, "Скидка не может быть меньше 1")
      .typeError("Введите скидку")
      .required("Введите скидку"),
    expirationDate: yup.string().required(),
  })
  .required();

const statuses = [
  { id: "ACTIVE", name: "Активный" },
  { id: "DISABLED", name: "Отключённый" },
];

export const CreatePromo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const promoId = location.pathname.split("/")[3];

  const methods = useForm({
    defaultValue: {
      value: "",
      name: "",
      status: "ACTIVE",
      expirationDate: new Date().toDateString(),
    },

    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  React.useEffect(() => {
    if (promoId !== undefined) {
      axios.get(`/admin/promo/${promoId}`).then((res) => {
        reset({
          expirationDate: res.data.expirationDate,
          value: res.data.value,
          name: res.data.name,
          status: res.data.status || "ACTIVE",
        });
      });
    } else {
      setValue("expirationDate", new Date(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [reset, promoId]);

  const onSave = (event) => {
    const formData = new FormData();
    Object.keys(event).forEach(key => {
      if (key === 'value') {
        formData.append(key, Number(event[key]));
        return
      }
      if (key === 'expirationDate') {
        formData.append('expirationDate', new Date(event.expirationDate).toISOString())
        return
      }
      if (key === 'media') {
        formData.append('file', event[key])
        return
      }
      formData.append(key, event[key]);
    })

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    if (promoId === undefined) {
      axios
        .post(`/admin/promo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/promo");
        });
    } else {
      axios
        .patch(`/admin/promo/${promoId}`, {
          ...event,
          value: +event.value,

          expirationDate: new Date(event.expirationDate).toISOString(),
        })
        .then(() => {
          navigate("/promo");
        });
    }
  };

  const handleChange = (newValue) => {
    setValue("expirationDate", newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={styles.root}>
      <ProductHeader
        backUrl="/promo"
        title={promoId ? watch("name") : "Новая акция"}
      />
      <form onSubmit={handleSubmit(onSave)}>
        <FormProvider {...methods}>
          <div className={styles.columns}>
            <PaperWrapper>
              <div className="mb-30">
                <InputComponent
                  name="name"
                  error={errors?.name?.message}
                  label="Название продукта"
                />
              </div>

              <div className="mb-30">
                <InputComponent
                  inputType="number"
                  name="value"
                  error={errors?.value?.message}
                  label="Скидка в процентах"
                  prefix="%"
                />
              </div>
              <UploadFile watch={watch} setValue={setValue} errors={errors} />
            </PaperWrapper>
            <div>
              <div className="mb-30">
                <PaperWrapper>
                  <SelectComponent
                    name="status"
                    label="Статус продукта"
                    items={statuses}
                    error={errors?.status?.message}
                  />
                  <div className="mt-30">
                    <LocalizationProvider
                      locale={ru}
                      dateAdapter={AdapterDateFns}
                    >
                      <DesktopDatePicker
                        label="Календарь"
                        inputFormat="MM/dd/yyyy"
                        value={watch("expirationDate")}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </PaperWrapper>
              </div>
            </div>
          </div>
        </FormProvider>
        <Button
          sx={{ textTransform: "none" }}
          variant="outlined"
          className="mt-20"
          type="submit"
        >
          Добавить акцию
        </Button>
      </form>
    </div>
  );
};
