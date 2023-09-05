import axios from '../../../core/axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaperWrapper } from '../../../components/PaperWrapper';
import { ProductHeader } from '../../../components/ProductHeader';
import styles from './CreateCategory.module.scss';
import { useForm, FormProvider } from 'react-hook-form';
import InputComponent from '../../../components/InputComponent';
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadFile from '../../../components/UploadFile/UploadFile';

const schema = yup
  .object({
    name: yup.string().required('Введите заголовок'),
  })
  .required();

export const CreateCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split('/')[3];

  const methods = useForm({
    defaultValue: {
      name: '',
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
    if (productId !== undefined) {
      axios.get(`/admin/category/${productId}`).then((res) => {
        reset({
          name: res.data.name,
        });
      });
    }
  }, [reset, productId]);

  const onSave = (event) => {
    const formData = new FormData();
    formData.append('file', event.media)
    formData.append('name', event.name)
    setLoading(true);
    if (productId === undefined) {
      axios
        .post(`/admin/category`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate('/category');
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .patch(`/admin/category/${productId}`, formData)
        .then(() => {
          navigate('/category');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className={styles.root}>
      <ProductHeader backUrl="/category" title={productId ? watch('name') : 'Новая категория'} />
      <form onSubmit={handleSubmit(onSave)}>
        <FormProvider {...methods}>
          <div className={styles.columns}>
            <PaperWrapper>
              <InputComponent
                name="name"
                error={errors?.name?.message}
                label="Название категории"
              />
              <UploadFile watch={watch} setValue={setValue} errors={errors} />
            </PaperWrapper>
          </div>
        </FormProvider>

        <LoadingButton
          sx={{ textTransform: 'none' }}
          variant="outlined"
          className="mt-20"
          loading={loading}
          type="submit">
          {productId ? 'Сохранить' : 'Создать'} категорию
        </LoadingButton>
      </form>
    </div>
  );
};
