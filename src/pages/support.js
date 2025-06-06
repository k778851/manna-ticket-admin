import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const statCards = [
  { label: '전체 게시글', value: 4 },
  { label: '감사 인사', value: 2 },
  { label: '고정 게시글', value: 2 },
  { label: '총 조회수', value: 876 },
];

const posts = [
  { id: 1, title: '1월 후원 목표 달성! 진심으로 감사드립니다', isNew: true, fixed: true, category: '감사인사', author: '관리자', status: '게시중', views: 342, date: '2024-01-15', content: '여러분의 따뜻한 마음 덕분에 1월 후원 목표를 달성할 수 있었습니다. 후원해주신 모든 분들께 깊은 감사의 뜻을 전합니다.' },
  { id: 2, title: '후원금 사용 내역 투명 공개', isNew: false, fixed: false, category: '보고서', author: '관리자', status: '게시중', views: 156, date: '2024-01-10', content: '지난 한 달간의 후원금이 어떻게 사용되었는지 투명하게 공개합니다. 식재료 구입, 주방 시설 개선 등에 소중히 사용되었습니다.' },
  { id: 3, title: '익명 후원자님께 특별한 감사글', isNew: false, fixed: true, category: '감사인사', author: '관리자', status: '게시중', views: 289, date: '2024-01-08', content: '큰 금액을 후원해주신 익명의 후원자님께 진심으로 감사드립니다. 더 나은 식사 환경을 만드는 데 소중히 사용하겠습니다.' },
  { id: 4, title: '2월 후원 목표와 계획 안내', isNew: false, fixed: false, category: '공지', author: '관리자', status: '게시중', views: 89, date: '2024-01-05', content: '2월 후원 목표와 계획을 안내드립니다.' },
];

export default function SupportPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀 + 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>후원 현황 관리</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ fontWeight: 600, height: 40 }}>게시글 내보내기</Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ fontWeight: 600, height: 40, background: 'var(--blue700)' }}>+ 감사 게시글 작성</Button>
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
      {/* 게시글 목록 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>후원 감사 게시글</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>후원에 대한 감사 인사와 관련 소식을 관리할 수 있습니다.</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <TextField size="small" placeholder="게시글 검색..." value={search} onChange={e => setSearch(e.target.value)} sx={{ width: 220, background: '#f9fafb' }} />
          <Select size="small" value={catFilter} onChange={e => setCatFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="감사인사">감사인사</MenuItem>
            <MenuItem value="보고서">보고서</MenuItem>
            <MenuItem value="공지">공지</MenuItem>
          </Select>
          <Select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 100, background: '#f9fafb' }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="게시중">게시중</MenuItem>
            <MenuItem value="임시저장">임시저장</MenuItem>
          </Select>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#f4f6fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>제목</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>카테고리</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작성자</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>상태</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>조회수</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작성일</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.filter(p => (catFilter === '전체' || p.category === catFilter) && (statusFilter === '전체' || p.status === statusFilter) && (!search || p.title.includes(search))).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.title}
                      {row.isNew && <Chip label="NEW" size="small" sx={{ background: '#f04452', color: '#fff', fontWeight: 700, fontSize: 12, ml: 1 }} />}
                      {row.fixed && <Chip label="고정" size="small" sx={{ background: '#f4f6fa', color: '#222', fontWeight: 700, fontSize: 12, ml: 1 }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.category} size="small" sx={{ background: row.category === '감사인사' ? '#e6f9f2' : row.category === '보고서' ? '#e3f2fd' : '#f4f6fa', color: row.category === '감사인사' ? '#10b981' : row.category === '보고서' ? '#3182f6' : '#888', fontWeight: 700, fontSize: 13 }} />
                  </TableCell>
                  <TableCell>{row.author}</TableCell>
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
      {/* 최근 게시글 미리보기 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>최근 게시글 미리보기</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>최근 작성된 후원 감사 게시글을 확인할 수 있습니다.</Typography>
        {posts.slice(0, 3).map((row) => (
          <Paper key={row.id} elevation={0} sx={{ mb: 2, p: 2, borderRadius: 2, background: '#f8fafc', border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography fontWeight={700}>{row.title}</Typography>
              {row.isNew && <Chip label="NEW" size="small" sx={{ background: '#f04452', color: '#fff', fontWeight: 700, fontSize: 12, ml: 1 }} />}
              {row.fixed && <Chip label="고정" size="small" sx={{ background: '#f4f6fa', color: '#222', fontWeight: 700, fontSize: 12, ml: 1 }} />}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{row.content}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">{row.category} | {row.author} | 조회수 {row.views}회 | {row.date}</Typography>
              <Box sx={{ flex: 1 }} />
              <IconButton size="small"><VisibilityOutlinedIcon /></IconButton>
              <IconButton size="small"><EditOutlinedIcon /></IconButton>
            </Box>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
} 