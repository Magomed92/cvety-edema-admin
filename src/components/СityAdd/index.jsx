import axios from 'axios';
import React from 'react';
import styles from './CityAdd.module.scss';
import { PaperWrapper } from '../PaperWrapper';
import CityFields from '../CitiyFields';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const CityAdd = () => {
  const [cities, setCities] = React.useState([]);
  const result = cities.some((obj) => obj.name === '' || obj.price === '');

  React.useEffect(() => {
    axios.get('https://cvety-edema.ru/api/admin/order/cities').then((res) => {
      setCities(res.data);
    });
  }, []);

  const added = () => {
    setCities([...cities, { name: '', price: '' }]);
  };
  const proverka = async () => {
    try {
      if (result === true) {
        alert('Одно полей не заполнено!');
      } else {
        alert('Города сохранены');
      }
      await axios.patch('https://cvety-edema.ru/api/admin/order/cities', { data: cities });
    } catch (error) {
      alert('Произошла ошибка с отправкой данных');
    }
  };

  const onRemove = (index) => {
    if (window.confirm('Вы действительно хотите удалить?') === true) {
      setCities(cities.filter((_, i) => i !== index));
    }
  };

  const updateCity = (index, pole, znachenie) => {
    setCities(
      cities.map((obj, i) => {
        if (index === i) {
          obj[pole] = znachenie;
        }
        return obj;
      }),
    );
  };

  return (
    <div className={styles.root}>
      <div style={{ width: '350px' }}>
        <PaperWrapper>
          {cities.map((obj, index) => (
            <div key={index}>
              <CityFields
                key={index}
                index={index}
                name={obj.name}
                price={obj.price}
                onChange={updateCity}
                onRemove={onRemove}
              />
            </div>
          ))}
          <LoadingButton
            disabled={result}
            sx={{ textTransform: 'none' }}
            className="mt-20"
            style={{ marginTop: '20px' }}
            type="submit"
            variant="outlined"
            onClick={proverka}>
            Сохранить
          </LoadingButton>
          <Button
            sx={{ textTransform: 'none' }}
            className="mt-20"
            style={{
              width: '150px',
              marginLeft: '20px',
              marginTop: '20px',
              background: 'grey',
              color: 'white',
            }}
            variant="saved"
            onClick={added}>
            Добавить еще
          </Button>
        </PaperWrapper>
      </div>
    </div>
  );
};
export default CityAdd;
