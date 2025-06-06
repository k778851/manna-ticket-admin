import React, { useState } from 'react';
import {
  Box, Paper, Typography, Button, Stack, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, InputAdornment, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const statCards = [
  { label: '오늘 점심', value: 45 },
  { label: '오늘 저녁', value: 38 },
  { label: '일반 신청', value: 2 },
  { label: '추가 신청', value: 3 },
  { label: 'QR 미제출', value: 8 },
];

const regularReservations = [
  { id: 1, user: '김철수', date: '2024-01-15', meal: '점심', status: '확정', qr: true, time: '12:30' },
  { id: 2, user: '박민수', date: '2024-01-15', meal: '점심', status: '확정', qr: false, time: '-' },
];

const additionalReservations = [
  { id: 1, user: '이영희', date: '2024-01-15', meal: '저녁', count: 2, reason: '회사 회식으로 인한 추가 인원 필요', status: '대기', qr: false },
  { id: 2, user: '정수진', date: '2024-01-15', meal: '저녁', count: 1, reason: '갑작스런 업무로 인한 추가 식사 필요', status: '대기', qr: false },
  { id: 3, user: '최영호', date: '2024-01-15', meal: '점심', count: 3, reason: '외부 방문객 접대', status: '확정', qr: true },
];

// 커스텀 탭 라벨
const customTabs = [
  { label: `일반 신청 (${regularReservations.length})`, value: 0 },
  { label: `추가 신청 (${additionalReservations.length})`, value: 1 },
];

const qrNotSubmitted = [
  { id: 1, name: '이영희', dept: '개발팀', meal: '저녁', count: 3 },
  { id: 2, name: '박민수', dept: '마케팅팀', meal: '점심', count: 1 },
  { id: 3, name: '김철수', dept: '영업팀', meal: '점심', count: 2 },
  { id: 4, name: '정수진', dept: '인사팀', meal: '저녁', count: 1 },
];

export default function Reservations() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [mealFilter, setMealFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (e, v) => setTab(v);

  const filtered = (tab === 0 ? regularReservations : additionalReservations).filter(r =>
    (!search || r.user.includes(search)) &&
    (mealFilter === '전체' || r.meal === mealFilter) &&
    (statusFilter === '전체' || r.status === statusFilter)
  );

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 + 버튼/필터 한 줄 배치 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>예약 현황 관리</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', minWidth: 420 }}>
          <TextField select size="small" value="오늘" sx={{ width: 120, background: '#fff' }}>
            <MenuItem value="오늘">오늘</MenuItem>
            <MenuItem value="이번주">이번주</MenuItem>
            <MenuItem value="이번달">이번달</MenuItem>
          </TextField>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ fontWeight: 600, height: 40 }}>예약 현황 내보내기</Button>
          <Button variant="contained" startIcon={<QrCode2OutlinedIcon />} sx={{ fontWeight: 600, height: 40, background: 'var(--blue700)' }}>QR 미제출자 확인</Button>
        </Box>
      </Box>
      {/* 통계 카드 한 줄 배치 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        {statCards.map((card, idx) => (
          <Paper key={card.label} elevation={2} sx={{ flex: 1, minWidth: 160, p: 2.5, textAlign: 'center', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">{card.label}</Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 1, color: idx === 2 ? '#3182f6' : idx === 3 ? '#faad14' : idx === 4 ? '#f04452' : '#222' }}>{card.value}</Typography>
          </Paper>
        ))}
      </Box>
      {/* 통계 카드 아래에 탭 메뉴 배치 */}
      <Box sx={{ mb: 3 }}>
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
      </Box>
      {/* 탭 아래에 Paper로 콘텐츠 감싸기 */}
      <Paper elevation={1} sx={{ borderRadius: 2, mb: 3, p: 0, background: 'transparent', boxShadow: 'none' }}>
        <Box sx={{ px: 3, py: 3, background: '#fff', borderRadius: 2 }}>
          {/* 상단 타이틀/설명 */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>{tab === 0 ? '일반 예약 현황' : '추가 예약 현황'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {tab === 0 ? '정규 식사 예약을 확인하고 관리할 수 있습니다.' : '추가 식사 예약을 확인하고 관리할 수 있습니다.'}
          </Typography>
          {/* 검색/필터 */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
            <TextField size="small" placeholder="사용자 검색..." value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              sx={{ width: 220, background: '#f9fafb' }}
            />
            <Select size="small" value={mealFilter} onChange={e => setMealFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="점심">점심</MenuItem>
              <MenuItem value="저녁">저녁</MenuItem>
            </Select>
            <Select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="확정">확정</MenuItem>
              <MenuItem value="대기">대기</MenuItem>
            </Select>
          </Box>
          {/* 테이블 */}
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, boxShadow: 'none', background: '#f8fafc', border: '1px solid #f0f0f0' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ background: '#f4f6fa' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>사용자</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>날짜</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>식사</TableCell>
                  {tab === 1 && (
                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>추가 인원</TableCell>
                  )}
                  {tab === 1 && (
                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>신청 사유</TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>상태</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>QR 제출</TableCell>
                  {tab === 0 && (
                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>제출 시간</TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15 }}>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id} hover sx={{ background: '#fff' }}>
                    <TableCell sx={{ fontWeight: 700, color: '#222' }}>{r.user}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.meal}</TableCell>
                    {tab === 1 && (
                      <TableCell>
                        <Chip label={`+${r.count}명`} sx={{ background: '#fff7e6', color: '#faad14', fontWeight: 700, fontSize: 14, px: 1.5 }} size="small" />
                      </TableCell>
                    )}
                    {tab === 1 && (
                      <TableCell>
                        <Typography noWrap sx={{ maxWidth: 220, fontSize: 14 }} title={r.reason}>{r.reason}</Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Chip label={r.status} sx={{ background: r.status === '확정' ? '#e3f2fd' : '#f3e5f5', color: r.status === '확정' ? '#1976d2' : '#8e24aa', fontWeight: 700, fontSize: 14 }} size="small" />
                    </TableCell>
                    <TableCell>
                      {r.qr ? <CheckIcon sx={{ color: '#10b981', fontSize: 22 }} /> : <CloseIcon sx={{ color: '#ef4444', fontSize: 22 }} />}
                    </TableCell>
                    {tab === 0 && (
                      <TableCell>{r.time}</TableCell>
                    )}
                    <TableCell>
                      {tab === 1 ? (
                        <>
                          <Button size="small" variant="outlined" sx={{ color: '#10b981', borderColor: '#10b981', fontWeight: 700, minWidth: 44, px: 1.5, mr: 0.5, '&:hover': { background: '#e6f9f2', borderColor: '#10b981' } }}>승인</Button>
                          <Button size="small" variant="outlined" sx={{ color: '#ef4444', borderColor: '#ef4444', fontWeight: 700, minWidth: 44, px: 1.5, mr: 0.5, '&:hover': { background: '#fff1f2', borderColor: '#ef4444' } }}>거절</Button>
                        </>
                      ) : null}
                      <IconButton size="small" sx={{ color: '#888', ml: 0.5 }}><VisibilityOutlinedIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
      {/* 경고 카드 */}
      <Box sx={{ mt: 3 }}>
        <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, background: 'var(--orange50)', border: '1px solid var(--orange100)', borderRadius: 3 }}>
          <WarningAmberOutlinedIcon sx={{ color: 'var(--yellow500)', fontSize: 32, mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'var(--orange500)', fontWeight: 'bold' }}>QR 미제출자</Typography>
            <Typography component="span" sx={{ fontSize: 24, fontWeight: 'bold', color: 'var(--red500)', mr: 2 }}>8명</Typography>
            <Typography component="span" color="text.primary">오늘 식사 예약 후 QR 미제출</Typography>
          </Box>
          <Button variant="outlined" sx={{ borderColor: 'var(--yellow500)', color: 'var(--orange500)', background: '#fff', borderRadius: 2, px: 3, height: 36, fontWeight: 600 }} onClick={() => setShowModal(true)}>
            명단 확인
          </Button>
        </Paper>
      </Box>
      {/* 미제출자 명단 팝업 */}
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
  );
} 