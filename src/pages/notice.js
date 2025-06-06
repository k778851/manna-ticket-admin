import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const statCards = [
  { label: '전체 공지', value: 2 },
  { label: '긴급 공지', value: 1 },
  { label: '고정 공지', value: 1 },
  { label: '총 조회수', value: 390 },
];

const notices = [
  { id: 1, title: '5월 식단 변경 안내', isNew: true, fixed: true, importance: '높음', status: '게시중', views: 234, date: '2024-04-28' },
  { id: 2, title: '시설 점검 안내', isNew: false, fixed: false, importance: '보통', status: '게시중', views: 156, date: '2024-04-25' },
];

export default function NoticePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('전체');

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 + 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>공지사항 관리</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ fontWeight: 600, height: 40, background: 'var(--blue700)' }}>+ 공지사항 추가</Button>
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
      {/* 공지사항 목록 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>공지사항 목록</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>등록된 모든 공지사항을 관리할 수 있습니다.</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <TextField size="small" placeholder="공지사항 검색..." value={search} onChange={e => setSearch(e.target.value)} sx={{ width: 240, background: '#f9fafb' }} />
          <Select size="small" value={filter} onChange={e => setFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="중요">중요</MenuItem>
            <MenuItem value="보통">보통</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#f4f6fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>제목</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>중요도</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>상태</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>조회수</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작성일</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.title}
                      {row.isNew && <Chip label="NEW" size="small" sx={{ background: '#f04452', color: '#fff', fontWeight: 700, fontSize: 12, ml: 1 }} />}
                      {row.fixed && <Chip label="고정" size="small" sx={{ background: '#f4f6fa', color: '#222', fontWeight: 700, fontSize: 12, ml: 1 }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.importance} size="small" sx={{ background: row.importance === '높음' ? '#f04452' : '#3182f6', color: '#fff', fontWeight: 700, fontSize: 13 }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" sx={{ background: '#e6f9f2', color: '#10b981', fontWeight: 700, fontSize: 13 }} />
                  </TableCell>
                  <TableCell>{row.views}회</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <IconButton size="small"><VisibilityOutlinedIcon /></IconButton>
                    <IconButton size="small"><EditOutlinedIcon /></IconButton>
                    <IconButton size="small"><DeleteOutlineOutlinedIcon /></IconButton>
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