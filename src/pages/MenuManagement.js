import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Stack,
  Divider,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const menuData = [
  {
    type: "점심 메뉴",
    date: "2024-01-15 | 한식",
    main: "소불고기",
    sides: "밥, 계란말이, 시금치나물, 김치",
    soup: "국",
    kcal: "650kcal",
    allergy: "대두, 계란",
  },
  {
    type: "저녁 메뉴",
    date: "2024-01-15 | 양식",
    main: "치킨까스",
    sides: "밥, 샐러드, 감자튀김",
    soup: "스프",
    kcal: "720kcal",
    allergy: "밀, 계란, 우유",
  },
];

const weekMenu = [
  {
    day: '월',
    date: '2024-01-15',
    lunch: { main: '소불고기', type: '한식', sides: '밥, 계란말이 외', kcal: 650 },
    dinner: { main: '치킨까스', type: '양식', sides: '밥, 샐러드 외', kcal: 720 },
  },
  {
    day: '화',
    date: '2024-01-16',
    lunch: { main: '짜장덮밥', type: '중식', sides: '단무지, 양파 외', kcal: 580 },
    dinner: { main: '제육볶음', type: '한식', sides: '밥, 콩나물 외', kcal: 690 },
  },
  {
    day: '수',
    date: '2024-01-17',
    lunch: { main: '돈까스', type: '일식', sides: '밥, 미소시루 외', kcal: 750 },
    dinner: { main: '스파게티', type: '양식', sides: '마늘빵, 샐러드', kcal: 680 },
  },
  {
    day: '목',
    date: '2024-01-18',
    lunch: { main: '갈비찜', type: '한식', sides: '밥, 나물 외', kcal: 720 },
    dinner: { main: '탕수육', type: '중식', sides: '밥, 짜장 외', kcal: 800 },
  },
  {
    day: '금',
    date: '2024-01-19',
    lunch: { main: '함박스테이크', type: '양식', sides: '밥, 감자 외', kcal: 670 },
    dinner: { main: '김치찌개', type: '한식', sides: '밥, 계란말이 외', kcal: 590 },
  },
];

const weekStats = [
  { label: '평균 칼로리', value: 665, unit: 'kcal' },
  { label: '메뉴 다양성', value: 4, unit: '가지 요리' },
  { label: '알레르기 주의', value: 3, unit: '가지 성분' },
  { label: '완성도', value: '100%', unit: '설정 완료' },
];

// 탭 스타일 커스텀
const customTabs = [
  { label: '오늘 메뉴', value: 0 },
  { label: '주간 메뉴', value: 1 },
];

export default function MenuManagement() {
  const [tab, setTab] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: '',
    mealType: '',
    foodType: '',
    main: '',
    sides: '',
    soup: '',
    kcal: '',
    allergy: '',
  });

  // 메뉴 추가 핸들러(실제 데이터 추가는 생략, 닫기만)
  const handleAddMenu = (e) => {
    e.preventDefault();
    setForm({ date: '', mealType: '', foodType: '', main: '', sides: '', soup: '', kcal: '', allergy: '' });
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f2f4f6", minHeight: "100vh", p: 3 }}>
      {/* 상단 타이틀/버튼 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700} sx={{ color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>
          식단 메뉴 관리
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="inherit" sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2, px: 2.5, height: 44 }}>
            메뉴 일괄 업로드
          </Button>
          <Button variant="contained" color="primary" sx={{ fontWeight: 700, fontSize: 16, borderRadius: 2, px: 2.5, height: 44 }} onClick={() => setOpen(true)}>
            + 메뉴 추가
          </Button>
        </Stack>
      </Stack>

      {/* 탭 */}
      <Box sx={{ mb: 2 }}>
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

      {tab === 0 ? (
        // 오늘 메뉴 카드 레이아웃
        <Grid container spacing={3}>
          {menuData.map((menu, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <StarBorderIcon fontSize="small" color="disabled" />
                    <Typography fontWeight={700} fontSize={18} sx={{ color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>{menu.type}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" mb={2} display="block" sx={{ fontWeight: 400, fontSize: 15, color: '#888' }}>
                    {menu.date}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 15, color: '#888' }}>
                    주요리
                  </Typography>
                  <Typography variant="h6" fontWeight={700} mb={1} sx={{ fontSize: 20, color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>
                    {menu.main}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 15, color: '#888' }}>
                    반찬
                  </Typography>
                  <Typography mb={1} sx={{ fontWeight: 400, fontSize: 16, color: '#444' }}>{menu.sides}</Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 15, color: '#888' }}>
                    국물
                  </Typography>
                  <Typography mb={2} sx={{ fontWeight: 400, fontSize: 16, color: '#444' }}>{menu.soup}</Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: 15, color: '#888' }}>
                      칼로리: {menu.kcal}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: 15, color: '#888' }}>
                      알레르기: {menu.allergy}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} mt={3}>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 600, fontSize: 15, borderRadius: 2, px: 2.5, height: 36 }}>
                      수정
                    </Button>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 600, fontSize: 15, borderRadius: 2, px: 2.5, height: 36 }}>
                      미리보기
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // 주간 메뉴 테이블 및 통계 카드
        <>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Typography variant="h6" fontWeight={900} sx={{ fontSize: 22, color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>
              주간 식단표
            </Typography>
            <Typography color="text.secondary" sx={{ fontWeight: 600, fontSize: 16, color: '#888' }}>2024년 1월 3주차</Typography>
            <Box flex={1} />
            <Button variant="outlined" sx={{ fontWeight: 700, fontSize: 15, borderRadius: 2, px: 2.5, height: 40, mr: 1 }}>주간 메뉴 편집</Button>
            <Button variant="contained" sx={{ fontWeight: 700, fontSize: 15, borderRadius: 2, px: 2.5, height: 40 }}>주간 메뉴 생성</Button>
          </Stack>
          <Paper elevation={2} sx={{ borderRadius: 3, p: 0, mb: 3 }}>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900, fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>
                <thead style={{ background: '#f4f6fa' }}>
                  <tr>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}>요일</th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}>날짜</th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}>점심 메뉴</th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}></th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}>저녁 메뉴</th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}></th>
                    <th style={{ padding: '14px 8px', fontWeight: 600, fontSize: 16, color: '#222', textAlign: 'left' }}>작업</th>
                  </tr>
                </thead>
                <tbody>
                  {weekMenu.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '13px 8px', fontWeight: 700, fontSize: 16, color: '#222', verticalAlign: 'top' }}>{row.day}</td>
                      <td style={{ padding: '13px 8px', fontWeight: 500, fontSize: 15, color: '#444', verticalAlign: 'top' }}>{row.date}</td>
                      {/* 점심 메뉴 */}
                      <td style={{ padding: '13px 8px', verticalAlign: 'top', minWidth: 180 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#222', display: 'flex', alignItems: 'center' }}>
                          {row.lunch.main}
                          <Chip label={row.lunch.type} size="small" sx={{ ml: 1, fontWeight: 700, background: '#f4f6fa', fontSize: 14, color: '#3182f6', height: 24 }} />
                        </div>
                        <div style={{ fontWeight: 400, fontSize: 15, color: '#444', marginTop: 2 }}>{row.lunch.sides}</div>
                        <div style={{ fontWeight: 400, fontSize: 13, color: '#aaa', marginTop: 2 }}>{row.lunch.kcal}kcal</div>
                      </td>
                      {/* 점심 메뉴 빈칸 */}
                      <td style={{ padding: '13px 8px', verticalAlign: 'top' }}></td>
                      {/* 저녁 메뉴 */}
                      <td style={{ padding: '13px 8px', verticalAlign: 'top', minWidth: 180 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#222', display: 'flex', alignItems: 'center' }}>
                          {row.dinner.main}
                          <Chip label={row.dinner.type} size="small" sx={{ ml: 1, fontWeight: 700, background: '#f4f6fa', fontSize: 14, color: '#3182f6', height: 24 }} />
                        </div>
                        <div style={{ fontWeight: 400, fontSize: 15, color: '#444', marginTop: 2 }}>{row.dinner.sides}</div>
                        <div style={{ fontWeight: 400, fontSize: 13, color: '#aaa', marginTop: 2 }}>{row.dinner.kcal}kcal</div>
                      </td>
                      {/* 저녁 메뉴 빈칸 */}
                      <td style={{ padding: '13px 8px', verticalAlign: 'top' }}></td>
                      <td style={{ padding: '13px 8px', verticalAlign: 'top' }}>
                        <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 22, color: '#888' }} /></IconButton>
                        <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 22, color: '#888' }} /></IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
          <Grid container spacing={3}>
            {weekStats.map((stat, idx) => (
              <Grid item xs={12} md={3} key={idx}>
                <Paper elevation={1} sx={{ borderRadius: 3, p: 3, textAlign: 'center', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <Typography color="text.secondary" fontWeight={500} fontSize={15} sx={{ color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif' }}>{stat.label}</Typography>
                  <Typography variant="h3" fontWeight={700} sx={{ mt: 1, color: '#222', fontFamily: 'Pretendard, Noto Sans KR, sans-serif', fontSize: 32 }}>{stat.value}</Typography>
                  <Typography color="text.secondary" fontSize={15} sx={{ color: '#888', fontFamily: 'Pretendard, Noto Sans KR, sans-serif', fontWeight: 400 }}>{stat.unit}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* 메뉴 추가 모달 */}
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
          메뉴 추가
          <Box component="span" sx={{ color: '#ef4444', fontWeight: 600, fontSize: 15, ml: 1 }}>*</Box>
        </DialogTitle>
        <Box sx={{ borderBottom: '1px solid #ececec', mx: 4 }} />
        <form onSubmit={handleAddMenu}>
          <DialogContent dividers sx={{ px: 4, py: 3, background: '#f9fafb' }}>
            {/* 날짜 */}
            <label htmlFor="menu-date" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              날짜 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="menu-date"
              type="date"
              fullWidth
              required
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              sx={{ mb: 2, background: '#fff', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--blue700)' } }}
              InputLabelProps={{ shrink: true }}
            />
            {/* 식사구분 */}
            <label htmlFor="menu-mealType" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              식사구분 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <Select
              id="menu-mealType"
              fullWidth
              required
              value={form.mealType}
              onChange={e => setForm({ ...form, mealType: e.target.value })}
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            >
              <MenuItem value="">선택</MenuItem>
              <MenuItem value="점심">점심</MenuItem>
              <MenuItem value="저녁">저녁</MenuItem>
            </Select>
            {/* 식사타입 */}
            <label htmlFor="menu-foodType" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              식사타입 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <Select
              id="menu-foodType"
              fullWidth
              required
              value={form.foodType}
              onChange={e => setForm({ ...form, foodType: e.target.value })}
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            >
              <MenuItem value="">선택</MenuItem>
              <MenuItem value="한식">한식</MenuItem>
              <MenuItem value="양식">양식</MenuItem>
              <MenuItem value="중식">중식</MenuItem>
              <MenuItem value="일식">일식</MenuItem>
              <MenuItem value="기타">기타</MenuItem>
            </Select>
            {/* 주요리 */}
            <label htmlFor="menu-main" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              주요리 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="menu-main"
              type="text"
              fullWidth
              required
              value={form.main}
              onChange={e => setForm({ ...form, main: e.target.value })}
              placeholder="예: 소불고기"
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            />
            {/* 반찬 */}
            <label htmlFor="menu-sides" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              반찬 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="menu-sides"
              type="text"
              fullWidth
              required
              value={form.sides}
              onChange={e => setForm({ ...form, sides: e.target.value })}
              placeholder="예: 밥, 계란말이, 시금치나물, 김치"
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            />
            {/* 국/국물 */}
            <label htmlFor="menu-soup" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              국/국물 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="menu-soup"
              type="text"
              fullWidth
              required
              value={form.soup}
              onChange={e => setForm({ ...form, soup: e.target.value })}
              placeholder="예: 국, 스프 등"
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
            />
            {/* 칼로리 */}
            <label htmlFor="menu-kcal" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              칼로리 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <TextField
              id="menu-kcal"
              type="number"
              fullWidth
              required
              value={form.kcal}
              onChange={e => setForm({ ...form, kcal: e.target.value })}
              placeholder="예: 650"
              sx={{ mb: 2, background: '#fff', borderRadius: 2 }}
              InputProps={{ endAdornment: <span style={{ color: '#888', fontWeight: 500, marginLeft: 4 }}>kcal</span> }}
            />
            {/* 알레르기 */}
            <label htmlFor="menu-allergy" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>
              알레르기
            </label>
            <TextField
              id="menu-allergy"
              type="text"
              fullWidth
              value={form.allergy}
              onChange={e => setForm({ ...form, allergy: e.target.value })}
              placeholder="예: 대두, 계란, 우유"
              sx={{ mb: 1, background: '#fff', borderRadius: 2 }}
            />
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