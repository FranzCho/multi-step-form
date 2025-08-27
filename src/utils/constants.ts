// 독서 상태 관련 상수
export const READING_STATUS = {
  WANT_TO_READ: 'want_to_read',
  READING: 'reading', 
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
} as const;

export const READING_STATUS_LABELS = {
  [READING_STATUS.WANT_TO_READ]: '읽고싶은 책',
  [READING_STATUS.READING]: '읽는 중',
  [READING_STATUS.COMPLETED]: '읽음',
  [READING_STATUS.ON_HOLD]: '보류',
} as const;

export type ReadingStatus = typeof READING_STATUS[keyof typeof READING_STATUS];

// RadioGroup에서 사용할 옵션 배열
export const READING_STATUS_OPTIONS = Object.entries(READING_STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));