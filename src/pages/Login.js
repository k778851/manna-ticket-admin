import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const SAMPLE_ID = '00371210-00149';
const SAMPLE_OTP = '123456';
const SAMPLE_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=sample';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 고유번호, 2: OTP
  const [idNumber, setIdNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(180);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [step, timer]);

  const handleIdNumberSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (idNumber === SAMPLE_ID) {
      setStep(2);
      setTimer(180);
    } else {
      setError('고유번호가 올바르지 않습니다.');
    }
  };

  const handleOtpChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    let next = otp.split('');
    next[idx] = val;
    next = next.join('').padEnd(6, '');
    setOtp(next);
    if (val && idx < 5) {
      otpRefs[idx + 1].current?.focus();
    }
    if (!val && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (otp === SAMPLE_OTP) {
      navigate('/');
    } else {
      setError('OTP가 올바르지 않습니다.');
    }
  };

  const handleResend = () => {
    setTimer(180);
    setOtp('');
    setError('');
    otpRefs[0].current?.focus();
  };

  const handleIdNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8, 13);
    }
    else if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }
    setIdNumber(value);
  };

  const timerStr = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ p: { xs: 3, sm: 4 }, width: '100%', maxWidth: 400, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff' }}>
          <Box sx={{ fontSize: 44, color: '#b3b8c2', mb: 1, mt: 1, userSelect: 'none' }}>⎈</Box>
          {step === 1 && (
            <>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, mt: 0.5, letterSpacing: -0.5 }}>
                만나식권 관리자 로그인
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                접속 허가된 관리자만 접근 가능합니다
              </Typography>
              <Box component="form" onSubmit={handleIdNumberSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="고유번호"
                  id="idNumber"
                  name="idNumber"
                  placeholder="예: 00371210-00149"
                  value={idNumber}
                  onChange={handleIdNumberChange}
                  fullWidth
                  size="small"
                  autoFocus
                  required
                  error={!!error}
                  helperText={error || '올바른 입력 형식: 숫자만 입력 가능합니다 (자동 하이픈 / 상단)'}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 600, height: 44, fontSize: 17 }} disabled={!idNumber}>
                  확인
                </Button>
              </Box>
            </>
          )}
          {step === 2 && (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, mt: 0.5, letterSpacing: -0.5 }}>
                OTP 인증
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                등록된 이메일로 전송된 6자리 인증 코드를 입력해 주세요.
              </Typography>
              <Typography variant="body2" sx={{ color: '#3b5fc5', mb: 1 }}>
                남은 시간: {timerStr}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img src={SAMPLE_QR} alt="QR코드" style={{ width: 120, height: 120, borderRadius: 8, background: '#f4f6fa', border: '1px solid #e5e7eb' }} />
              </Box>
              <Box component="form" onSubmit={handleOtpSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  {[0,1,2,3,4,5].map(i => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      style={{ width: 38, height: 44, fontSize: 28, textAlign: 'center', border: error ? '2px solid #f04452' : '1.5px solid #b3b8c2', borderRadius: 6, outline: 'none', background: '#f8fafc', marginRight: i < 5 ? 4 : 0 }}
                      autoFocus={i === 0}
                    />
                  ))}
                </Box>
                {error && <Typography color="#f04452" fontSize={14} sx={{ mb: 1 }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 600, height: 44, fontSize: 17, mb: 1 }} disabled={otp.length !== 6 || otp.split('').some(v => !v)}>로그인</Button>
                <Button onClick={handleResend} color="primary" fullWidth sx={{ fontWeight: 500, fontSize: 15, background: '#f4f6fa', borderRadius: 2, mb: 1 }}>
                  인증 코드 재전송
                </Button>
                <Button onClick={() => { setStep(1); setOtp(''); setError(''); }} color="inherit" fullWidth sx={{ mt: 0 }}>
                  고유번호 다시 입력
                </Button>
              </Box>
            </Box>
          )}
          {/* 샘플 안내 박스 */}
          <Box sx={{ width: '100%', mt: 3, background: '#eaf3ff', borderRadius: 2, p: 2, fontSize: 15 }}>
            <Typography variant="subtitle2" sx={{ color: '#3b5fc5', fontWeight: 700, mb: 0.5 }}>
              테스트용 OTP 코드:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 0, color: '#3b5fc5', fontSize: 15 }}>
              <li>123456</li>
              <li>654321</li>
              <li>111111</li>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ textAlign: 'center', color: '#b3b8c2', fontSize: 14, py: 3, letterSpacing: -0.2 }}>
        © 2025 만나식권 시스템. All rights reserved.
      </Box>
    </Box>
  );
};

export default Login; 