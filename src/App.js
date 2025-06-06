import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

// Layout
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reservations from './pages/reservations';
import QRPage from './pages/qr';
import NoticePage from './pages/notice';
import SettingsPage from './pages/settings';
import HelpPage from './pages/help';
import UsersPage from './pages/users';
import SupportPage from './pages/support';
import MenuManagement from './pages/MenuManagement';

// 임시 더미 페이지
const Dummy = ({ title }) => <div style={{ padding: 32, fontSize: 20 }}>🚧 <b>{title}</b> 페이지는 준비중입니다.</div>;

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="qr" element={<QRPage />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
