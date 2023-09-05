import Category from './pages/Category';
import Orders from './pages/Orders';

import { PromoList } from './pages/promos/PromoList';
import { CreatePromo } from './pages/promos/CreatePromo';

import { ProductsList } from './pages/products/ProductsList';
import { CreateProduct } from './pages/products/CreateProduct';
import { CreateCategory } from './pages/Category/CreateCategory';
import OrderInfo from './pages/Orders/OrderInfo';

import CityAdd from './components/СityAdd';

export const mainRoutes = [
  {
    path: '/',
    element: <ProductsList />,
  },
  {
    path: '/cities',
    element: <CityAdd />,
  },
  {
    path: '/products/edit/:productsId',
    element: <CreateProduct />,
  },
  {
    path: '/products/create',
    element: <CreateProduct />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/orders/edit/:ordersId',
    element: <OrderInfo />,
  },
  {
    path: '/promo',
    element: <PromoList />,
  },
  {
    path: '/promo/edit/:productsId',
    element: <CreatePromo />,
  },
  {
    path: '/promo/create',
    element: <CreatePromo />,
  },
  {
    path: '/category/create',
    element: <CreateCategory />,
  },
  {
    path: '/category/edit/:productsId',
    element: <CreateCategory />,
  },
];
