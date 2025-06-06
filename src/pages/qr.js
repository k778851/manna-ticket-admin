import React from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';

const qrStats = {
  todaySubmit: 67,
  total: 83,
  rate: 81,
};

const notSubmitted = [
  { id: 1, user: '이영희', meal: '저녁', time: '18:00', count: 3, status: '경고' },
  { id: 2, user: '박민수', meal: '점심', time: '12:00', count: 1, status: '정상' },
];

export default function QRPage() {
  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 + 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>QR 코드 관리</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ fontWeight: 600, height: 40 }}>QR 통계 내보내기</Button>
        </Box>
      </Box>
      {/* 통계 카드 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Paper elevation={2} sx={{ flex: 1, minWidth: 260, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary">오늘 QR 제출</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>{qrStats.todaySubmit}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>전체 {qrStats.total}명 중</Typography>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, minWidth: 260, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary">제출률</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mr: 2 }}>{qrStats.rate}%</Typography>
            <LinearProgress variant="determinate" value={qrStats.rate} sx={{ flex: 1, height: 10, borderRadius: 5, background: '#f0f0f0', '& .MuiLinearProgress-bar': { background: 'var(--blue700)' } }} />
          </Box>
        </Paper>
      </Box>
      {/* 미제출자 명단 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>QR 미제출자 명단</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>식사 예약 후 QR 코드를 제출하지 않은 사용자 목록</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#f4f6fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>사용자</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>예약 식사</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>예약 시간</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>미제출 횟수</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>상태</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notSubmitted.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.meal}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Chip label={`${row.count}회`} sx={{ background: row.count >= 3 ? '#fff1f0' : '#f4f6fa', color: row.count >= 3 ? '#f04452' : '#222', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.status} sx={{ background: row.status === '경고' ? '#fff1f0' : '#f4f6fa', color: row.status === '경고' ? '#f04452' : '#10b981', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 600, minWidth: 64, mr: 1 }}>알림 발송</Button>
                    {row.status === '경고' && (
                      <Button variant="outlined" size="small" color="error" sx={{ fontWeight: 600, minWidth: 48 }}>재재</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 