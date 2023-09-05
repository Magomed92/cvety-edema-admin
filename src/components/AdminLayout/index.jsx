import Nav from '../../components/Nav';
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from '../../components/Header';
const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />
      <Nav open={open} setOpen={setOpen} />
      {children}
    </Box>
  );
};

export default AdminLayout;
