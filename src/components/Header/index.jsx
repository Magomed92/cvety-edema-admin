import React from 'react';

import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const titles = {
  '/': 'Товары',
  '/products/create': 'Создание продукта',
  '/products/edit/': 'Редактирование продукта',
  '/category': 'Категории',
  '/category/create': 'Создание категории',
  '/category/edit/': 'Редактирование категории',
  '/promo': 'Акции',
  '/promo/create': 'Создание акции',
  '/promo/edit/': 'Редактирование акции',
  '/orders': 'Заказы',
  '/orders/edit/': 'Просмотр заказа',
};

export const Header = ({ open, setOpen }) => {
  const location = useLocation();

  const title = location.pathname.includes('edit')
    ? titles[location.pathname.split('/edit/')[0] + '/edit/']
    : titles[location.pathname];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            color: 'white',
            ...(open && { display: 'none' }),
          }}>
          <MenuIcon />
        </IconButton>
        {location.pathname === '/cities' ? <h3 style={{ color: 'white' }}>Города</h3> : ''}
        <Typography sx={{ color: 'white' }} variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
