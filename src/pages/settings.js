import React, { useState } from 'react';
import { Box, Paper, Typography, Button, TextField, Stack, MenuItem, Chip, Checkbox } from '@mui/material';

const initialEndpoints = [
  { name: '로그인', method: 'POST', path: '/auth/login', status: 'success' },
  { name: '사용자 정보', method: 'GET', path: '/users', status: 'success' },
  { name: '예약 관리', method: 'GET/POST', path: '/reservations', status: 'success' },
  { name: '공지사항', method: 'GET/POST', path: '/notices', status: 'fail' },
  { name: '식단 관리', method: 'GET/POST', path: '/menus', status: 'success' },
];

const customTabs = [
  { label: '기본 설정', value: 0 },
  { label: 'API 연동', value: 1 },
  { label: '보안 설정', value: 2 },
];

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
  const [siteName, setSiteName] = useState('만나식권');
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  // 엔드포인트 상태 관리
  const [endpoints, setEndpoints] = useState(initialEndpoints);
  const [editing, setEditing] = useState({}); // { idx: path }

  // 엔드포인트 path 인풋 변경 핸들러
  const handleEndpointChange = (idx, value) => {
    setEditing((prev) => ({ ...prev, [idx]: value }));
  };
  // 엔드포인트 저장 핸들러
  const handleEndpointSave = (idx) => {
    setEndpoints((prev) => prev.map((ep, i) => i === idx ? { ...ep, path: editing[idx] ?? ep.path } : ep));
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>시스템 설정</Typography>
      {/* 탭 */}
      <Paper elevation={0} sx={{ mb: 0, background: 'transparent', boxShadow: 'none', mt: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
          {customTabs.map(tabItem => (
            <Button
              key={tabItem.value}
              onClick={() => setTab(tabItem.value)}
              disableRipple
              sx={{
                flex: 1,
                height: 44,
                borderRadius: 1.2,
                fontWeight: tab === tabItem.value ? 700 : 500,
                fontSize: 16,
                color: tab === tabItem.value ? '#222' : '#444',
                background: tab === tabItem.value ? '#fff' : 'transparent',
                border: tab === tabItem.value ? '2px solid #222' : 'none',
                boxShadow: tab === tabItem.value ? '0 1px 6px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {tabItem.label}
            </Button>
          ))}
        </Stack>
      </Paper>
      {/* 탭별 콘텐츠 여백 */}
      <Box sx={{ mb: 3 }} />
      {/* 기본 설정 카드 */}
      {tab === 0 && (
        <Paper elevation={2} sx={{ mt: 2, p: 4, borderRadius: 2, width: '100%', mx: 'auto' }}>
          <Typography fontWeight={700} sx={{ mb: 1 }}>기본 설정</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>시스템의 기본 정보를 설정할 수 있습니다.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField label="사이트 이름" size="small" value={siteName} onChange={e => setSiteName(e.target.value)} fullWidth />
            <TextField label="관리자 이메일" size="small" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} fullWidth />
            <Button variant="contained" sx={{ width: 100, mt: 2, fontWeight: 600, background: 'var(--blue700)' }}>저장</Button>
          </Box>
        </Paper>
      )}
      {/* API 연동 탭 */}
      {tab === 1 && (
        <Box sx={{ width: '100%' }}>
          {/* API 연동 상태 */}
          <Paper elevation={2} sx={{ mb: 3, p: 3, borderRadius: 2, background: '#fffbe6', border: '1px solid #ffe58f' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={700}>API 연동 상태</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#f04452', mr: 1 }} />
                <Typography color="#f04452" fontSize={14}>연결 실패</Typography>
              </Box>
            </Box>
            <Typography color="#faad14" fontSize={15} sx={{ mb: 2 }}>
              ⚠️ API 서버와의 연결에 실패했습니다.<br />
              서버 상태를 확인하거나, 네트워크 연결을 점검해 주세요.<br />
              오류 지속 시 관리자에게 문의해 주세요.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography fontSize={15}>재시도 주기:</Typography>
              <TextField select size="small" value="5분" sx={{ width: 100, background: '#fff' }}>
                <MenuItem value="1분">1분</MenuItem>
                <MenuItem value="5분">5분</MenuItem>
                <MenuItem value="10분">10분</MenuItem>
              </TextField>
            </Box>
          </Paper>

          {/* API 기본 URL 설정 */}
          <Paper elevation={2} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography fontWeight={700}>API 기본 URL 설정</Typography>
                <Typography variant="body2" color="text.secondary">SaaS 연동을 위한 API 서버 주소를 입력합니다.</Typography>
              </Box>
              <Button variant="outlined" sx={{ fontWeight: 600, minWidth: 100 }}>연결 테스트</Button>
            </Box>
            <TextField size="small" fullWidth value="http://api.example.com" sx={{ mt: 1 }} />
          </Paper>

          {/* API 엔드포인트 목록 */}
          <Paper elevation={2} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>API 엔드포인트 목록</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {endpoints.map((ep, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #f0f0f0', borderRadius: 1, background: '#fafbfc' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: ep.status === 'success' ? '#10b981' : '#f04452' }} />
                    <Typography fontWeight={700} fontSize={15}>{ep.name}</Typography>
                  </Box>
                  <Chip label={ep.method} size="small" sx={{ background: '#f4f6fa', color: '#3182f6', fontWeight: 700, fontSize: 13 }} />
                  <TextField
                    size="small"
                    value={editing[idx] !== undefined ? editing[idx] : ep.path}
                    onChange={e => handleEndpointChange(idx, e.target.value)}
                    sx={{ flex: 1, minWidth: 120 }}
                  />
                  <Button variant="outlined" size="small" sx={{ fontWeight: 600, minWidth: 64, mr: 1 }}>테스트</Button>
                  <Button variant="outlined" size="small" sx={{ fontWeight: 600, minWidth: 48 }} onClick={() => handleEndpointSave(idx)}>저장</Button>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* 시스템 관리 */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <Box>
                <Typography fontWeight={700} sx={{ mb: 1 }}>시스템 관리</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>API 연동 이후 시스템 설정을 관리합니다.</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField label="시스템 버전" size="small" value="v1.0.0" sx={{ width: 120 }} />
                  <TextField label="최소요구버전" size="small" value="5호" sx={{ width: 120 }} />
                  <TextField label="최대 호출 횟수" size="small" value="1회" sx={{ width: 120 }} />
                </Box>
                <Button variant="contained" sx={{ width: 100, fontWeight: 600, background: 'var(--blue700)' }}>저장</Button>
              </Box>
              <Box sx={{ textAlign: 'right', minWidth: 180 }}>
                <Typography variant="body2" color="text.secondary">마지막 업데이트</Typography>
                <Typography fontWeight={600}>2024. 5. 29</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
      {/* 보안 설정 탭 */}
      {tab === 2 && (
        <Paper elevation={2} sx={{ mt: 2, p: 4, borderRadius: 2, width: '100%', mx: 'auto' }}>
          <Typography fontWeight={700} sx={{ mb: 1 }}>보안 설정</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>시스템 보안 관련 설정을 관리합니다.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {/* 비밀번호 변경 주기 */}
            <TextField
              select
              label="비밀번호 변경 주기"
              size="small"
              value={"30일"}
              sx={{ width: 300 }}
            >
              <MenuItem value="30일">30일</MenuItem>
              <MenuItem value="60일">60일</MenuItem>
              <MenuItem value="90일">90일</MenuItem>
            </TextField>
            {/* IP 제한 */}
            <TextField
              label="IP 접근 제한"
              size="small"
              placeholder="IP 주소 입력 (쉼표로 구분)"
              sx={{ width: '100%' }}
              helperText={"접근을 허용할 IP 주소를 입력하세요. (예: 127.0.0.1, 192.168.0.1)"}
            />
            {/* 2단계 인증 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>2단계 인증 사용</Typography>
              <Checkbox sx={{ ml: 1 }} />
              <Typography sx={{ ml: 1 }}>사용</Typography>
            </Box>
            <Button variant="contained" sx={{ width: 100, mt: 2, fontWeight: 600, background: 'var(--blue700)' }}>저장</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
} 