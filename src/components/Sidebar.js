import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const menuItems = [
  { text: '대시보드', icon: <DashboardIcon />, path: '/' },
  { text: '사용자', icon: <PeopleAltOutlinedIcon />, path: '/users' },
  { text: '예약 현황', icon: <EventNoteOutlinedIcon />, path: '/reservations' },
  { text: 'QR 코드', icon: <QrCode2OutlinedIcon />, path: '/qr' },
  { text: '식단 메뉴', icon: <RestaurantMenuOutlinedIcon />, path: '/menu' },
  { text: '공지사항', icon: <WhatshotOutlinedIcon />, path: '/notice' },
  { text: '후원 현황', icon: <FavoriteBorderOutlinedIcon />, path: '/support' },
  { text: '시스템 설정', icon: <SettingsOutlinedIcon />, path: '/settings' },
  { text: '도움말', icon: <HelpOutlineOutlinedIcon />, path: '/help' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside style={{ width: 220, minHeight: '100vh', background: '#fff', borderRight: '1px solid #e5e7eb', paddingTop: 64 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={location.pathname === item.path ? {
              backgroundColor: 'var(--blue700)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 700,
              '& .MuiListItemIcon-root': { color: '#fff' },
              '&:hover': { backgroundColor: 'var(--blue700)' }
            } : {
              borderRadius: '8px',
              color: 'var(--contentSub)',
              '& .MuiListItemIcon-root': { color: 'var(--contentSub)' }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </aside>
  );
};

export default Sidebar; 