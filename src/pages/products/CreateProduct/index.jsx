import { useDropzone } from 'react-dropzone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from '../../../core/axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaperWrapper } from '../../../components/PaperWrapper';
import { ProductHeader } from '../../../components/ProductHeader';
import styles from './Products.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import InputComponent from '../../../components/InputComponent';
import SelectComponent from '../../../components/SelectComponent';
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton } from '@mui/material';

const schema = yup.object({
  title: yup.string().required('Введите заголовок'),
  category_id: yup
    .number('Выберите категорию')
    .typeError('Выберите категорию')
    .required('Выберите категорию'),
  promo_id: yup.number('Выберите промо-код'),
  status: yup.string('Выберите статус').typeError('Выберите статус').required('Выберите статус'),
  price: yup
    .number()
    .positive('Цена должна быть положительным числом')
    .integer('Цена должна быть целым числом')
    .typeError('Введите цену')
    .required('Введите цену'),
  description: yup.string().required('Введите описание товара'),
  media: yup.array().min(1, 'Изображение обязательно'),
});

export const statuses = [
  { id: 'ACTIVE', name: 'Активный' },
  { id: 'DISABLED', name: 'Отключённый' },
];

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export const CreateProduct = () => {
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const [category, setCategory] = React.useState([]);
  const [promo, setPromo] = React.useState([]);
  const navigate = useNavigate();
  console.log(navigate, 123124);

  const productId = location.pathname.split('/')[3];
  const methods = useForm({
    defaultValue: {
      media: [],
      price: '',
      title: '',
      description: '',
      category_id: '',
      promo_id: 0,
      status: 'ACTIVE',
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const media = watch('media') || [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      try {
        const formData = new FormData();

        formData.append('file', files[0]);
        const { data } = await axios.post('/admin/media/upload', formData);
        console.log(formData, data);

        setValue('media', [...media, data], { shouldValidate: true });
      } catch (error) {
        console.warn(error);
        alert('Ошибка при загрузке изображения');
      }
    },
    multiple: false,
  });

  React.useEffect(() => {
    if (productId !== undefined) {
      axios.get(`/admin/product/${productId}`).then((res) => {
        reset({
          price: res.data.price,
          title: res.data.title,
          description: res.data.description,
          category_id: res.data.category.id || '',
          promo_id: res.data.promo?.id || 0,
          media: res.data.media,
          status: res.data.status || 'ACTIVE',
        });
      });
    }
  }, [reset, productId]);

  React.useEffect(() => {
    register('media');

    axios.get('/category').then((res) => {
      setCategory(res.data);
    });
    axios.get('/admin/promo').then((res) => {
      setPromo(res.data.items);
    });
  }, []);

  const onSave = (event) => {
    setLoading(true);
    if (productId === undefined) {
      axios
        .post(`/admin/product`, {
          ...event,
          media: event.media.map((el) => el.id).filter(Boolean),
          price: +event.price,
        })
        .then(() => {
          navigate('/');
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .patch(`/admin/product/${productId}`, {
          ...event,
          price: +event.price,
          media: event.media.map((el) => el.id).filter(Boolean),
        })
        .then(() => {
          navigate('/');
        })
        .finally(() => setLoading(false));
    }
  };

  const onDeleteImage = (id) => {
    setValue(
      'media',
      media.filter((el) => el.id !== id),
      { shouldValidate: true },
    );
  };

  const thumbs = media?.map((file) => (
    <div className={styles.thumb} key={file.url}>
      <IconButton onClick={() => onDeleteImage(file.id)}>
        <HighlightOffIcon />
      </IconButton>
      <div className={styles.thumbInner}>
        <img
          src={`https://cvety-edema.ru${file.url}`}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.url);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles.root}>
      <ProductHeader backUrl="/" title={productId ? watch('title') : 'Новый товар'} />
      <form onSubmit={handleSubmit(onSave)}>
        <FormProvider {...methods}>
          <div className={styles.columns}>
            <PaperWrapper>
              <div className="mb-30">
                <InputComponent
                  name="title"
                  error={errors?.title?.message}
                  label="Название продукта"
                />
              </div>
              <div className="mb-30">
                <InputComponent
                  multiline
                  name="description"
                  error={errors?.description?.message}
                  label="Описание продукта"
                />
              </div>
              <div className="mb-30">
                <InputComponent
                  inputType="number"
                  name="price"
                  error={errors?.price?.message}
                  label="Цена продукта"
                />
              </div>
              <div className={styles.uploadFiles}>
                <section style={{ width: '100%' }} className="container">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Кликните сюда или перетащите изображение</p>
                  </div>

                  <aside style={thumbsContainer}>{thumbs}</aside>
                  <p style={{ color: 'red' }}>{errors?.media?.message}</p>
                </section>
              </div>
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
                </PaperWrapper>
              </div>
              <div className="mb-30">
                <PaperWrapper>
                  <SelectComponent
                    name="category_id"
                    label="Категория продукта"
                    items={category}
                    error={errors?.category_id?.message}
                  />
                </PaperWrapper>
              </div>

              <PaperWrapper>
                <SelectComponent
                  emptyText="Не выбрано"
                  name="promo_id"
                  label="Промо-код"
                  items={promo}
                  error={errors?.promo_id?.message}
                />
              </PaperWrapper>
            </div>
          </div>
        </FormProvider>

        <LoadingButton
          sx={{ textTransform: 'none' }}
          className="mt-20"
          style={{ marginTop: '20px' }}
          loading={loading}
          type="submit"
          variant="outlined">
          {productId ? 'Сохранить' : 'Добавить'} товар
        </LoadingButton>
      </form>
    </div>
  );
};
