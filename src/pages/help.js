import React, { useState } from 'react';
import { Box, Paper, Typography, Stack, Button, TextField } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const tabMenus = [
  '시스템 개요', '대시보드', '사용자 관리', '예약 관리', 'QR 관리', '메뉴 관리', '공지사항', '후원 관리', '시스템 설정'
];

const helpContents = [
  // 각 탭별 도움말 내용(이미지 참고, 예시)
  {
    title: '시스템 개요',
    sections: [
      {
        title: '만나식권 관리자 시스템 소개',
        content: '만나식권 관리자 시스템은 식권 예약, QR 체크, 통계 등 다양한 기능을 통합적으로 관리할 수 있는 기업/단체 전용 시스템입니다. 실시간 모니터링 데이터와 통계 뷰를 통해 효율적인 식권 운영 환경을 지원합니다.'
      },
      {
        title: '주요 기능',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>식권 신청/승인/관리</li>
            <li>QR 코드 체크 및 통계</li>
            <li>공지사항 관리</li>
            <li>식단 메뉴 관리</li>
            <li>실시간 통계 및 모니터링</li>
          </ul>
        )
      },
      {
        title: '시스템 요구사항',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>운영체제: Windows 10 이상, macOS 10.4 이상</li>
            <li>브라우저: Chrome 90+, Firefox 85+, Safari 14+, Edge 90+</li>
            <li>모바일 환경: 모바일 브라우저 최적화</li>
            <li>화면: 해상도 1280x720 이상 권장</li>
          </ul>
        )
      },
      {
        title: '접속 및 로그인',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>브라우저에서 관리자 페이지 URL로 접속합니다.</li>
            <li>관리자 계정으로 로그인합니다.</li>
            <li>로그인 후 대시보드 화면이 표시됩니다.</li>
            <li>세부 서비스별 메뉴를 통해 기능에 접근할 수 있습니다.</li>
          </ol>
        )
      }
    ]
  },
  {
    title: '대시보드',
    sections: [
      {
        title: '대시보드 개요',
        content: '대시보드는 시스템의 핵심 현황을 한눈에 확인할 수 있는 메인 화면입니다. 실시간 통계 카드, 차트, 알림 등 통해 한 번에 업무를 모니터링할 수 있습니다.'
      },
      {
        title: '주요 통계 카드',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>오늘의 점심/저녁 예약 현황</li>
            <li>일반/추가 신청 건수</li>
            <li>QR 미제출 현황</li>
            <li>부서별/시간대별 예약 통계</li>
            <li>일별 예약 추이</li>
            <li>경고/알림 카드</li>
          </ul>
        )
      },
      {
        title: '차트 해석 방법',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><b>부서별 예약 현황</b>: 각 부서별 예약 건수 비교</li>
            <li><b>시간대별 예약 현황</b>: 시간별 예약 집중도 파악</li>
            <li><b>부서별 예약 비율</b>: 전체 예약 중 부서별 비율</li>
            <li><b>일별 예약 추이</b>: 주간 점심/저녁 예약 변화 추이</li>
          </ul>
        )
      },
      {
        title: '집계 다운로드',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>대시보드 상단의 <b>내보내기</b> 버튼을 클릭합니다.</li>
            <li>엑셀/CSV 파일로 통계 데이터를 다운로드합니다.</li>
            <li>PDF로 출력도 가능합니다.</li>
            <li>다운로드 파일은 통계/차트 데이터를 포함합니다.</li>
          </ol>
        )
      },
      {
        title: '실시간 모니터링',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>실시간 예약/QR 제출 현황을 대시보드에서 모니터링합니다.</li>
            <li>경고/알림 카드로 주요 이슈를 즉시 확인할 수 있습니다.</li>
            <li>통계/차트는 실시간 데이터로 자동 갱신됩니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '사용자 관리',
    sections: [
      {
        title: '사용자 관리 개요',
        content: '사용자 관리에서는 시스템에 등록된 사용자 정보를 조회, 수정, 삭제할 수 있습니다. 사용자별 등급, 상태, 식권/예약 등 다양한 관리 액션도 함께 진행할 수 있습니다.'
      },
      {
        title: '새 사용자 추가',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>사용자 등록 버튼을 클릭합니다.</li>
            <li>필수 정보를 입력합니다.</li>
            <li>등록 버튼을 클릭합니다.</li>
            <li>등록된 사용자는 목록에 추가됩니다.</li>
            <li><b>※ 등록 후 권한/상태를 별도로 설정할 수 있습니다.</b></li>
          </ol>
        )
      },
      {
        title: '사용자 정보 수정',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>사용자 목록에서 해당 사용자를 선택합니다.</li>
            <li>수정 버튼을 클릭합니다.</li>
            <li>수정할 정보를 입력/변경합니다.</li>
            <li>저장 버튼을 클릭합니다.</li>
            <li><b>※ 권한/상태도 함께 변경할 수 있습니다.</b></li>
          </ol>
        )
      },
      {
        title: '사용자 상태 관리',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>사용자 상태(활성/비활성/탈퇴 등)를 관리할 수 있습니다.</li>
            <li>상태 변경 시, 해당 사용자의 서비스 이용이 제한됩니다.</li>
            <li>상태는 목록에서 바로 변경 가능합니다.</li>
          </ul>
        )
      },
      {
        title: '사용자 검색 및 필터링',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>상단의 검색창에 이름/이메일을 입력합니다.</li>
            <li>필터 옵션을 선택해 상세검색을 할 수 있습니다.</li>
            <li>검색 결과는 목록에 바로 반영됩니다.</li>
          </ol>
        )
      },
      {
        title: 'QR 제출률 분석',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>각 사용자별 QR 제출률을 아래와 같이 확인할 수 있습니다.</li>
            <li>제출률 = (QR 제출 수 / 예약 수) × 100</li>
            <li>100%: 모든 예약에 QR 제출(우수)</li>
            <li>70~99%: 양호</li>
            <li>70% 미만: 주의 필요</li>
            <li>※ 제출률이 낮은 사용자는 목록에서 별도 표시될 수 있습니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '예약 관리',
    sections: [
      {
        title: '예약 관리 개요',
        content: '예약 관리에서는 모든 식사 예약을 확인하고 승인/거절할 수 있습니다. 일반 예약과 추가 예약을 구분하여 관리하며, QR 제출 현황도 함께 모니터링할 수 있습니다.'
      },
      {
        title: '일반 예약 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>'일반 신청' 탭을 선택합니다.</li>
            <li>예약 목록에서 승인 요청 예약을 확인합니다.</li>
            <li>예약 상세 정보를 검토합니다.</li>
            <li>'승인' 또는 '거절' 버튼을 클릭합니다.</li>
            <li>거절 시 사유를 입력합니다(선택사항).</li>
            <li>승인/거절 결과가 사용자에게 안내됩니다.</li>
            <li>상태별로 예약을 필터링할 수 있습니다.</li>
            <li>예약 내역을 엑셀로 내보낼 수 있습니다.</li>
            <li>상세 내역은 클릭 시 팝업으로 확인할 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: '추가 예약 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>'추가 신청' 탭을 선택합니다.</li>
            <li>예약 목록에서 승인 요청 예약을 확인합니다.</li>
            <li>추가 인원/사유를 검토합니다.</li>
            <li>식당 수용 가능 여부를 고려하여 승인/거절을 결정합니다.</li>
            <li>승인/거절 결과가 사용자에게 안내됩니다.</li>
            <li>상태별로 예약을 필터링할 수 있습니다.</li>
            <li>예약 내역을 엑셀로 내보낼 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: '예약 상태 이해',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>대기: 승인/거절 전 상태</li>
            <li>확정: 승인이 완료된 예약</li>
            <li>거절: 거절된 예약</li>
            <li>취소: 사용자가 직접 취소한 예약</li>
            <li>만료: 예약일이 지나 자동 만료</li>
          </ul>
        )
      },
      {
        title: 'QR 미제출자 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>예약 후 QR 제출 여부를 확인합니다.</li>
            <li>미제출자는 별도 목록에서 확인할 수 있습니다.</li>
            <li>알림 발송, 제재 등 추가 조치가 가능합니다.</li>
            <li>미제출 내역은 통계로도 확인할 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: '예약 데이터 내보내기',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>상단의 내보내기 버튼을 클릭합니다.</li>
            <li>엑셀, PDF 등 다양한 형식으로 다운로드할 수 있습니다.</li>
            <li>필터/검색 결과만 내보낼 수도 있습니다.</li>
            <li>다운로드 파일에는 예약 상세 정보가 포함됩니다.</li>
            <li>※ 필요에 따라 맞춤 양식으로 내보낼 수 있습니다.</li>
          </ol>
        )
      }
    ]
  },
  {
    title: 'QR 관리',
    sections: [
      {
        title: 'QR 관리 개요',
        content: 'QR 관리에서는 예약자 명단을 확인하며, QR 코드 스캔을 통해 예약자와 식사 여부를 확인하고, 미제출자/통계 등 다양한 현황을 손쉽게 모니터링할 수 있습니다.'
      },
      {
        title: 'QR 스캐너 사용법',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>QR 메뉴에서 스캐너를 실행합니다.</li>
            <li>예약자의 QR 코드를 스캔합니다.</li>
            <li>스캔 성공 시 예약 정보가 확인됩니다.</li>
            <li>스캔 실패 시 오류 메시지가 표시됩니다.</li>
            <li><b>※ 등록된 예약만 인식됩니다.</b></li>
          </ol>
        )
      },
      {
        title: 'QR 제출률 모니터링',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>대시보드, QR 관리 메뉴에서 제출률 현황을 실시간으로 확인합니다.</li>
            <li>제출률 = (QR 제출 수 / 예약 수) × 100</li>
            <li>100%: 모든 예약에 QR 제출(우수)</li>
            <li>70~99%: 양호</li>
            <li>70% 미만: 주의 필요</li>
          </ul>
        )
      },
      {
        title: '미제출자 알림 발송',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>미제출자 명단에서 알림 발송 버튼을 클릭합니다.</li>
            <li>문자, 알림톡 등으로 미제출자에게 알림을 보냅니다.</li>
            <li>알림 발송 후 상태가 갱신됩니다.</li>
          </ol>
        )
      },
      {
        title: '제재 조치 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>미제출자에게 누적 횟수에 따라 제재 조치를 적용할 수 있습니다.</li>
            <li>1회: 경고, 2회: 일시정지, 3회 이상: 영구정지 등</li>
            <li>제재 조치 내역은 사용자 정보에서 확인할 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: 'QR 스캔 기록 관리',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>모든 QR 스캔 기록이 저장/조회됩니다.</li>
            <li>최근 스캔 내역, 실패 내역을 확인할 수 있습니다.</li>
            <li>필요 시 스캔 기록을 엑셀로 다운로드할 수 있습니다.</li>
            <li>제재/알림 등 통계 기능과 연계됩니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '메뉴 관리',
    sections: [
      {
        title: '메뉴 관리 개요',
        content: '메뉴 관리에서는 주간 식단, 메뉴 업로드, 알레르기 정보, 통계 등 다양한 메뉴 관련 기능을 손쉽게 관리할 수 있습니다.'
      },
      {
        title: '새 메뉴 추가',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>'메뉴 추가' 버튼을 클릭합니다.</li>
            <li>메뉴 정보를 입력합니다.</li>
            <li>알레르기 정보/이미지(선택)를 등록합니다.</li>
            <li>저장 버튼을 클릭합니다.</li>
            <li>저장된 메뉴는 목록에서 바로 확인됩니다.</li>
          </ol>
        )
      },
      {
        title: '주간 메뉴 계획',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>주간 메뉴 등록을 클릭합니다.</li>
            <li>요일별/일정별 메뉴를 입력합니다.</li>
            <li>등록된 메뉴는 달력에서 확인할 수 있습니다.</li>
            <li>수정/삭제도 달력에서 바로 가능합니다.</li>
            <li>주간 메뉴는 관리자만 등록/수정할 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: '메뉴 일괄 업로드',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>엑셀 파일로 메뉴를 일괄 업로드할 수 있습니다.</li>
            <li>양식 파일을 다운로드 후 작성합니다.</li>
            <li>작성된 파일을 업로드합니다.</li>
            <li>업로드된 메뉴는 목록/달력에서 확인됩니다.</li>
            <li>중복/오류 항목은 자동으로 검증됩니다.</li>
          </ol>
        )
      },
      {
        title: '알레르기 정보 관리',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>메뉴별 알레르기 정보를 등록/관리할 수 있습니다.</li>
            <li>등록된 정보는 사용자에게 표시됩니다.</li>
            <li>식단 통계/분석에도 활용됩니다.</li>
          </ul>
        )
      },
      {
        title: '메뉴 통계 및 분석',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>메뉴별 인기/선호도 통계를 확인할 수 있습니다.</li>
            <li>월별/주간 메뉴 이용 현황을 분석합니다.</li>
            <li>통계 데이터는 엑셀로 다운로드할 수 있습니다.</li>
            <li>메뉴별 통계는 관리자만 확인할 수 있습니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '공지사항',
    sections: [
      {
        title: '공지사항 관리 개요',
        content: '공지사항 관리에서는 사용자에게 전달할 각종 안내사항, 변경사항, 중요 공지들을 작성하고 관리할 수 있습니다. 중요도에 따른 분류와 고정 공지 기능을 제공합니다.'
      },
      {
        title: '새 공지사항 작성',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>'공지사항 추가' 버튼을 클릭합니다.</li>
            <li>공지사항 정보를 입력합니다.
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>제목 (필수)</li>
                <li>내용 (필수)</li>
                <li>중요도 선택(높음/보통/낮음)</li>
                <li>고정 여부 설정</li>
                <li>첨부파일이 있을 경우 업로드합니다.</li>
              </ul>
            </li>
            <li>미리보기로 내용을 확인합니다.</li>
            <li>'게시' 버튼을 클릭하여 공지를 발행합니다.</li>
            <li>작성된 공지는 목록에서 확인할 수 있습니다.</li>
          </ol>
        )
      },
      {
        title: '중요도 설정 가이드',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>공지사항의 중요도는 다음 기준으로 설정합니다.</li>
            <li>높음: 긴급 안내, 시스템 장애, 정책 변경 등</li>
            <li>보통: 일반 안내, 업데이트 소식</li>
            <li>낮음: 단순 알림, 일반 안내사항</li>
            <li>고정 공지: 항상 상단에 노출할 안내</li>
            <li>카테고리, 키워드 별로 분류</li>
          </ul>
        )
      },
      {
        title: '고정 공지 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>공지사항을 고정 공지로 설정하는 기능입니다.</li>
            <li>고정 공지는 목록 상단에 항상 노출됩니다.</li>
            <li>고정 해제 시 일반 공지로 변경됩니다.</li>
          </ol>
        )
      },
      {
        title: '공지사항 편집 및 삭제',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>공지사항 목록에서 해당 공지를 선택합니다.</li>
            <li>수정/삭제 버튼을 클릭해 편집/삭제합니다.</li>
            <li>삭제된 공지는 복구가 불가합니다.</li>
          </ol>
        )
      },
      {
        title: '조회수 및 통계',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>공지사항별 조회수/통계를 제공합니다.</li>
            <li>사용자별 조회 이력도 확인할 수 있습니다.</li>
            <li>조회수/통계는 관리자만 확인 가능합니다.</li>
            <li>공지사항별 통계는 엑셀로 다운로드할 수 있습니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '후원 관리',
    sections: [
      {
        title: '후원 관리 개요',
        content: '후원 관리에서는 후원 내역을 등록/관리하고, 후원금 사용 내역을 투명하게 공개하며, 관련 소식을 공지할 수 있습니다.'
      },
      {
        title: '감사 게시물 작성',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>'감사 게시물 작성' 버튼을 클릭합니다.</li>
            <li>제목, 내용을 입력합니다.</li>
            <li>후원자 명단을 첨부합니다(선택).</li>
            <li>이미지/파일을 첨부합니다(선택).</li>
            <li>'게시' 버튼을 클릭하여 게시물을 등록합니다.</li>
          </ol>
        )
      },
      {
        title: '카테고리별 관리',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>후원 게시물은 다음 카테고리로 관리합니다.</li>
            <li>후원금 집행 내역</li>
            <li>기부/후원 감사글</li>
            <li>소식/업데이트 안내</li>
            <li>Q&A/문의 응답</li>
            <li>후원자 명단 공개</li>
            <li>기타</li>
          </ul>
        )
      },
      {
        title: '투명성 확보',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>모든 후원 내역을 상세히 공개합니다.</li>
            <li>후원금 사용 내역을 투명하게 관리합니다.</li>
            <li>정기적으로 후원금 집행 내역을 공지합니다.</li>
            <li>후원자 명단을 주기적으로 업데이트합니다.</li>
          </ol>
        )
      },
      {
        title: '게시글 상태 관리',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>게시글은 아래 상태로 관리합니다.</li>
            <li>임시 저장/공개/비공개</li>
            <li>상태 변경 시 알림 발송</li>
            <li>삭제/복구 기능 제공</li>
          </ul>
        )
      },
      {
        title: '후원자 소통',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>후원자와의 소통을 위한 댓글/문의 기능을 제공합니다.</li>
            <li>공지사항/업데이트를 통해 소식을 전달합니다.</li>
            <li>후원자 전용 이벤트/혜택을 안내합니다.</li>
            <li>감사 메시지/카드를 발송할 수 있습니다.</li>
          </ul>
        )
      }
    ]
  },
  {
    title: '시스템 설정',
    sections: [
      {
        title: '시스템 설정 개요',
        content: '시스템 설정에서는 기본 정보, API, SSO, 2FA, 보안, 통계 등 시스템 운영에 필요한 다양한 설정을 관리할 수 있습니다. 일부 설정 사항은 관리자만 접근/변경이 가능합니다.'
      },
      {
        title: '기본 설정 관리',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>기본 설정 메뉴를 클릭합니다.</li>
            <li>사이트 이름, 관리자 이메일 등 정보를 입력/수정합니다.</li>
            <li>저장 버튼을 클릭해 변경사항을 저장합니다.</li>
          </ol>
        )
      },
      {
        title: 'API 연동 설정',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>API 연동 메뉴를 클릭합니다.</li>
            <li>API 서버 주소를 입력/수정합니다.</li>
            <li>각 API 엔드포인트를 등록/수정합니다.</li>
            <li>테스트 버튼으로 연결 상태를 확인합니다.</li>
            <li>저장 버튼을 클릭해 변경사항을 저장합니다.</li>
          </ol>
        )
      },
      {
        title: '보안 설정',
        content: (
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            <li>보안 설정 메뉴를 클릭합니다.</li>
            <li>비밀번호 변경 주기, 2단계 인증, IP 제한 등 보안 옵션을 설정합니다.</li>
            <li>저장 버튼을 클릭해 변경사항을 저장합니다.</li>
          </ol>
        )
      },
      {
        title: '백업 및 복원',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>데이터 백업/복원 기능을 제공합니다.</li>
            <li>주기적 자동 백업을 권장합니다.</li>
            <li>백업 파일은 안전하게 보관하세요.</li>
            <li>복원 시 백업 파일을 선택해 복원할 수 있습니다.</li>
          </ul>
        )
      },
      {
        title: '시스템 모니터링',
        content: (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>시스템 상태를 실시간으로 모니터링합니다.</li>
            <li>최근 사용/접속 이력을 확인합니다.</li>
            <li>특정 이벤트 발생 시 알림을 받을 수 있습니다.</li>
            <li>시스템 로그를 주기적으로 점검하세요.</li>
          </ul>
        )
      }
    ]
  },
];

const recentUpdates = [
  { version: 'v1.2.0', desc: '낮/밤 점심 기능 추가', date: '2024.05.20' },
  { version: 'v1.1.5', desc: 'API 연동 기능 개선', date: '2024.05.10' },
  { version: 'v1.1.0', desc: '대시보드 차트 기능 추가', date: '2024.04.30' },
];

export default function HelpPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <Box sx={{ p: 4, background: '#f2f4f6', minHeight: '100vh' }}>
      {/* 상단 타이틀/검색/PDF */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={700}>도움말</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField size="small" placeholder="도움말 검색..." value={search} onChange={e => setSearch(e.target.value)} sx={{ width: 180, background: '#fff' }} />
          <Button variant="outlined" startIcon={<PictureAsPdfOutlinedIcon />} sx={{ fontWeight: 600, height: 40 }}>PDF 다운로드</Button>
        </Box>
      </Box>
      {/* 탭 메뉴 */}
      <Paper elevation={0} sx={{ mb: 3, background: 'transparent', boxShadow: 'none' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
          {tabMenus.map((label, idx) => (
            <Button
              key={label}
              onClick={() => setTab(idx)}
              disableRipple
              sx={{
                flex: 1,
                height: 44,
                borderRadius: 1.2,
                fontWeight: tab === idx ? 700 : 500,
                fontSize: 16,
                color: tab === idx ? '#222' : '#444',
                background: tab === idx ? '#fff' : 'transparent',
                border: tab === idx ? '2px solid #222' : 'none',
                boxShadow: tab === idx ? '0 1px 6px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Paper>
      {/* 도움말 콘텐츠 */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        {helpContents[tab] ? helpContents[tab].sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 4 }}>
            <Typography fontWeight={700} sx={{ mb: 1, fontSize: 18 }}>{section.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{section.content}</Typography>
          </Box>
        )) : <Typography>준비 중입니다.</Typography>}
      </Paper>
      {/* 하단 카드 3개 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <DescriptionOutlinedIcon sx={{ fontSize: 36, color: '#b0b8c1', mb: 1 }} />
          <Typography fontWeight={700}>사용자 매뉴얼</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>상세한 사용자 매뉴얼을 PDF로 다운로드하세요.</Typography>
          <Button variant="outlined" size="small">다운로드</Button>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <DescriptionOutlinedIcon sx={{ fontSize: 36, color: '#10b981', mb: 1 }} />
          <Typography fontWeight={700}>실시간 지원</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>궁금한 점이 있으시면 언제든 문의하세요.</Typography>
          <Button variant="outlined" size="small">문의하기</Button>
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <DescriptionOutlinedIcon sx={{ fontSize: 36, color: '#a78bfa', mb: 1 }} />
          <Typography fontWeight={700}>동영상 튜토리얼</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>단계별 사용법을 동영상으로 확인하세요.</Typography>
          <Button variant="outlined" size="small">시청하기</Button>
        </Paper>
      </Box>
      {/* 최근 업데이트 */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography fontWeight={700} sx={{ mb: 2 }}>최근 업데이트</Typography>
        {recentUpdates.map((item, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography color="#f04452" fontWeight={700} sx={{ minWidth: 70 }}>{item.version}</Typography>
            <Typography sx={{ flex: 1 }}>{item.desc}</Typography>
            <Typography color="text.secondary" sx={{ minWidth: 100 }}>{item.date}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
} 