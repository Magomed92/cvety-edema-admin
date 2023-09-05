import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import styles from './Nav.module.scss';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import ListAltIcon from '@mui/icons-material/ListAlt';

import ApartmentIcon from '@mui/icons-material/Apartment';
import CityAdd from '../СityAdd';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const navList = [
  {
    title: 'Товары',
    icon: <AddShoppingCartIcon />,
    path: '/',
  },
  {
    title: 'Категории',
    icon: <CategoryIcon />,
    path: '/category',
  },
  {
    title: 'Акции',
    icon: <DiscountIcon />,
    path: '/promo',
  },
  {
    title: 'Заказы',
    icon: <ListAltIcon />,
    path: '/orders',
  },
  {
    title: 'Города',
    icon: <ApartmentIcon />,
    path: '/cities',
  },
];

const Nav = ({ open, setOpen }) => {
  const location = useLocation();
  const theme = useTheme();
  return (
    <Drawer className={styles.draw} variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className={styles.list}>
        {navList.map((item) => (
          <Link key={item.title} to={item.path}>
            <ListItem
              sx={{ display: 'block' }}
              selected={location.pathname === item.path ? 'active' : ''}
              disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Nav;
