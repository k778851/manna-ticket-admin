import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, LinearProgress, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const statCards = [
  { label: '전체 사용자', value: 156 },
  { label: '활성 사용자', value: 142 },
  { label: '비활성 사용자', value: 14 },
  { label: '이번 주 신규', value: 8 },
];

const initialUsers = [
  { id: 1, name: '김철수', idNumber: '00371210-00149', status: '활성', count: 23, qr: 95, lastLogin: '2024-01-15' },
  { id: 2, name: '이영희', idNumber: '00371210-00150', status: '비활성', count: 15, qr: 87, lastLogin: '2024-01-10' },
  { id: 3, name: '박민수', idNumber: '00371210-00151', status: '활성', count: 31, qr: 100, lastLogin: '2024-01-14' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('전체');
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', idNumber: '', status: '활성' });

  // 사용자 추가 핸들러
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.idNumber) return;
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: form.name,
        idNumber: form.idNumber,
        status: form.status,
        count: 0,
        qr: 0,
        lastLogin: '-',
      },
    ]);
    setForm({ name: '', idNumber: '', status: '활성' });
    setOpen(false);
  };

  const filteredUsers = users.filter(
    (u) =>
      (filter === '전체' || u.status === filter) &&
      (!search || u.name.includes(search) || u.idNumber.includes(search))
  );

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 + 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>사용자 관리</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ fontWeight: 600, height: 40 }}>사용자 목록 내보내기</Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ fontWeight: 600, height: 40, background: 'var(--blue700)' }} onClick={() => setOpen(true)}> 사용자 추가</Button>
        </Box>
      </Box>
      {/* 통계 카드 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {statCards.map((card, idx) => (
          <Paper key={card.label} elevation={2} sx={{ flex: 1, minWidth: 180, p: 2.5, textAlign: 'center', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">{card.label}</Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>{card.value}</Typography>
          </Paper>
        ))}
      </Box>
      {/* 사용자 목록 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>사용자 목록</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>등록된 모든 사용자를 관리할 수 있습니다.</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <TextField size="small" placeholder="사용자 검색..." value={search} onChange={e => setSearch(e.target.value)} sx={{ width: 220, background: '#f9fafb' }} />
          <Select size="small" value={filter} onChange={e => setFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="활성">활성</MenuItem>
            <MenuItem value="비활성">비활성</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#f4f6fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>이름</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>고유번호</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>상태</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>예약 횟수</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>QR 제출률</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>최근 로그인</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.idNumber}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" sx={{ background: row.status === '활성' ? '#e6f9f2' : '#f4f6fa', color: row.status === '활성' ? '#10b981' : '#888', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell>{row.count}회</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress variant="determinate" value={row.qr} sx={{ width: 80, height: 8, borderRadius: 5, background: '#f0f0f0', '& .MuiLinearProgress-bar': { background: 'var(--blue700)' } }} />
                      <Typography fontWeight={700} sx={{ minWidth: 36 }}>{row.qr}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.lastLogin}</TableCell>
                  <TableCell>
                    <IconButton size="small"><EditOutlinedIcon /></IconButton>
                    <IconButton size="small"><VisibilityOutlinedIcon /></IconButton>
                    <IconButton size="small"><DeleteOutlineOutlinedIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 사용자 추가 모달 */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            p: 0,
            background: '#f9fafb',
          }
        }}
        onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
      >
        <DialogTitle sx={{
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: -1,
          pb: 1.5,
          pt: 3,
          px: 4,
          color: '#222',
        }}>
          사용자 추가
          <Box component="span" sx={{ color: '#ef4444', fontWeight: 600, fontSize: 15, ml: 1 }}>*</Box>
        </DialogTitle>
        <Box sx={{ borderBottom: '1px solid #ececec', mx: 4 }} />
        <form onSubmit={handleAddUser}>
          <DialogContent dividers sx={{ px: 4, py: 3, background: '#f9fafb' }}>
            {/* 이름 */}
            <label htmlFor="user-name" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              이름 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="user-name"
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="예: 홍길동"
              inputProps={{ maxLength: 20 }}
              sx={{ mb: 2, background: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--blue700)' } }}
            />
            {/* 고유번호 */}
            <label htmlFor="user-idNumber" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              고유번호 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="user-idNumber"
              margin="dense"
              type="text"
              fullWidth
              required
              value={form.idNumber}
              onChange={e => setForm({ ...form, idNumber: e.target.value })}
              placeholder="예: 00371210-00149"
              inputProps={{ maxLength: 20 }}
              sx={{ mb: 2, background: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--blue700)' } }}
            />
            {/* 상태 */}
            <label htmlFor="user-status" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              상태 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <Select
              id="user-status"
              margin="dense"
              fullWidth
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              sx={{ mb: 1, background: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--blue700)' } }}
            >
              <MenuItem value="활성">활성</MenuItem>
              <MenuItem value="비활성">비활성</MenuItem>
            </Select>
            <Box sx={{ color: '#888', fontSize: 13, mt: 1, ml: 0.5 }}>
              * 필수 입력 항목입니다.
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 4, pb: 3, pt: 2, background: '#f9fafb' }}>
            <Button 
              onClick={() => setOpen(false)} 
              color="inherit" 
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1.2,
                fontSize: 16,
                color: '#666',
                border: '1px solid #e5e7eb',
                background: '#fff',
                '&:hover': { background: '#f3f4f6', borderColor: '#d1d5db' }
              }}
            >취소</Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                px: 3,
                py: 1.2,
                fontSize: 16,
                boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
                background: 'var(--blue700)',
                '&:hover': { background: '#2563eb' }
              }}
            >저장</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
} 