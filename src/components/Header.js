import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" color="inherit" elevation={1} sx={{ zIndex: 1201, borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mr: 2 }}>
            만나식권 관리자
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ border: '1px solid #e5e7eb', background: '#f5f5f5', px: 1.5, py: 0.5, borderRadius: 1, ml: 1, fontWeight: 600 }}>
            manna1.scjpeter.net
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>
            관리자
          </Button>
          <Button variant="outlined" size="small" color="primary" onClick={() => navigate('/login')}>
            로그아웃
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 