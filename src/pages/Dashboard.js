import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from 'recharts';
import { CalendarToday, AccessTime, Person, TrendingUp, Warning as WarningIcon } from '@mui/icons-material';
import {
  Paper, Box, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

const statCards = [
  {
    title: '총 예약',
    value: 83,
    sub: '오늘',
    icon: <CalendarToday color="primary" />,
  },
  {
    title: '주간 예약',
    value: 324,
    sub: '이번 주',
    icon: <AccessTime color="primary" />,
  },
  {
    title: '총 사용자',
    value: 156,
    sub: '등록된 사용자',
    icon: <Person color="secondary" />,
  },
  {
    title: 'QR 제출률',
    value: '81%',
    sub: '오늘 기준',
    icon: <TrendingUp color="success" />,
  },
];

const barData = [
  { name: '개발팀', 예약: 12 },
  { name: '마케팅팀', 예약: 6 },
  { name: '영업팀', 예약: 6 },
  { name: '인사팀', 예약: 5 },
  { name: '기획팀', 예약: 3 },
];

const timeData = [
  { 시간: '06:00', 예약수: 5 },
  { 시간: '08:00', 예약수: 10 },
  { 시간: '10:00', 예약수: 15 },
  { 시간: '12:00', 예약수: 40 },
  { 시간: '14:00', 예약수: 20 },
  { 시간: '16:00', 예약수: 30 },
  { 시간: '18:00', 예약수: 15 },
  { 시간: '20:00', 예약수: 8 },
  { 시간: '22:00', 예약수: 3 },
];

const pieData = [
  { name: '개발팀', value: 35, color: '#3182f6' },
  { name: '마케팅팀', value: 24, color: '#03b26c' },
  { name: '영업팀', value: 18, color: '#ffc342' },
  { name: '인사팀', value: 15, color: '#f04452' },
  { name: '기획팀', value: 8, color: '#8b95a1' },
];

const lineData = [
  { name: '월', 점심: 40, 저녁: 35 },
  { name: '화', 점심: 42, 저녁: 38 },
  { name: '수', 점심: 45, 저녁: 40 },
  { name: '목', 점심: 50, 저녁: 45 },
  { name: '금', 점심: 55, 저녁: 50 },
  { name: '토', 점심: 30, 저녁: 25 },
  { name: '일', 점심: 15, 저녁: 13 },
];

const qrNotSubmitted = [
  { id: 1, name: '이영희', dept: '개발팀', meal: '저녁', count: 3 },
  { id: 2, name: '박민수', dept: '마케팅팀', meal: '점심', count: 1 },
  { id: 3, name: '김철수', dept: '영업팀', meal: '점심', count: 2 },
  { id: 4, name: '정수진', dept: '인사팀', meal: '저녁', count: 1 },
];

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: 'var(--bgSecondary)', px: 4, py: 4 }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        {/* 상단 타이틀 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary" mr={2}>대시보드</Typography>
          <Typography variant="caption" sx={{ background: '#f3f4f6', px: 1, py: 0.5, borderRadius: 1, ml: 1, color: '#888', fontWeight: 600 }}>ver 1.2.0</Typography>
        </Box>
        {/* 통계 카드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {statCards.map((card) => (
            <Paper key={card.title} elevation={3} sx={{ borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', gap: 1, minHeight: 110, border: '1px solid #f0f0f0', background: 'var(--bgPrimary)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {card.icon}
                <Typography color="text.secondary" fontWeight={600} fontSize={14}>{card.title}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">{card.value}</Typography>
                <Typography variant="caption" color="text.secondary" mb={0.5}>{card.sub}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
        {/* 차트 카드 2x2 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          {/* 부서별 예약 현황 */}
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, minHeight: 320, display: 'flex', flexDirection: 'column', border: '1px solid #f0f0f0', background: 'var(--bgPrimary)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600}>부서별 예약 현황</Typography>
              <Typography variant="caption" color="text.secondary">이번 주</Typography>
            </Box>
            <Box sx={{ flex: 1, pt: 2 }}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                  <Tooltip />
                  <Bar dataKey="예약" fill="#3182f6" radius={[8, 8, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
          {/* 시간대별 식사 예약 현황 */}
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, minHeight: 320, display: 'flex', flexDirection: 'column', border: '1px solid #f0f0f0', background: 'var(--bgPrimary)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600}>시간대별 식사 예약 현황</Typography>
              <Typography variant="caption" color="text.secondary">오늘</Typography>
            </Box>
            <Box sx={{ flex: 1, pt: 2 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={timeData}>
                  <XAxis dataKey="시간" tick={{ fontSize: 13 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="예약수" stroke="#03b26c" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
          {/* 부서별 예약 비율 */}
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, minHeight: 320, display: 'flex', flexDirection: 'column', border: '1px solid #f0f0f0', background: 'var(--bgPrimary)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600}>부서별 예약 비율</Typography>
              <Typography variant="caption" color="text.secondary">이번 주</Typography>
            </Box>
            <Box sx={{ flex: 1, mb: 3 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="55%"
                    outerRadius={60}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ bottom: -10 }}/>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
          {/* 일별 점심/저녁 예약 추이 */}
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, minHeight: 320, display: 'flex', flexDirection: 'column', border: '1px solid #f0f0f0', background: 'var(--bgPrimary)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600}>일별 점심/저녁 예약 추이</Typography>
              <Typography variant="caption" color="text.secondary">이번 주</Typography>
            </Box>
            <Box sx={{ flex: 1, pt: 2 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="점심" stroke="#3182f6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="저녁" stroke="#f04452" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
        {/* 경고 카드 */}
        <Box sx={{ width: '100%', mt: 3 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, background: 'var(--orange50)', border: '1px solid var(--orange100)', display: 'flex', alignItems: 'center', gap: 2 }}>
            <WarningIcon sx={{ color: 'var(--yellow500)', fontSize: 32, mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: 'var(--orange500)', fontWeight: 'bold' }}>QR 미제출자 </Typography>
              <Typography component="span" sx={{ fontSize: 24, fontWeight: 'bold', color: 'var(--red500)', mr: 2 }}>8명</Typography>
              <Typography component="span" color="text.primary">오늘 식사 예약 후 QR 미제출</Typography>
            </Box>
            <Button variant="outlined" sx={{ borderColor: 'var(--yellow500)', color: 'var(--orange500)', background: '#fff', borderRadius: 2, px: 3, height: 36, fontWeight: 600 }}
              onClick={() => setShowModal(true)}>
              명단 확인
            </Button>
          </Paper>
        </Box>
        {/* MUI 모달 */}
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle>QR 미제출자 명단</DialogTitle>
          <DialogContent>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>부서</TableCell>
                  <TableCell>식사</TableCell>
                  <TableCell>미제출 횟수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {qrNotSubmitted.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.dept}</TableCell>
                    <TableCell>{row.meal}</TableCell>
                    <TableCell sx={{ color: 'var(--red500)', fontWeight: 'bold' }}>{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="primary" variant="outlined">닫기</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;