import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            bgcolor: '#f2f4f6',
            p: 2,
            pt: 8,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '100%', m: '0 auto' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 