export interface BookFormData {
  // Step 1 fields
  readingStatus?: string;
  title?: string;
  author?: string;
  publicationDate?: string;
  readingStartDate?: string;
  readingEndDate?: string;

  // Step 2 fields
  rating?: number;
  description?: string;

  // Step 3, 4, 5 fields (필요시 추가)
  [key: string]: unknown;
}

// 날짜 검증
const isValidDate = (dateString: string): boolean => {
  return (
    typeof dateString === 'string' &&
    dateString.trim() !== '' &&
    !isNaN(new Date(dateString).getTime())
  );
};

// 각 스텝별 필수 필드 검증 함수들
export const validateStep1 = (formData: BookFormData): boolean => {
  const {
    readingStatus,
    title,
    author,
    publicationDate,
    readingStartDate,
    readingEndDate,
  } = formData;

  // 기본 필수 필드 검증
  if (!(readingStatus && title && author && publicationDate)) {
    return false;
  }

  // 독서 상태별 날짜 검증
  if (
    readingStatus === 'reading' ||
    readingStatus === 'completed' ||
    readingStatus === 'on_hold'
  ) {
    if (!readingStartDate || !isValidDate(readingStartDate)) {
      return false;
    }

    // 독서 시작일은 도서 출판일 이후여야 함
    if (isValidDate(publicationDate)) {
      const pubDate = new Date(publicationDate);
      const startDate = new Date(readingStartDate);
      if (startDate < pubDate) {
        return false;
      }
    }

    // '읽음' 상태일 때 종료일 검증
    if (readingStatus === 'completed') {
      if (!readingEndDate || !isValidDate(readingEndDate)) {
        return false;
      }

      // 독서 시작일은 독서 종료일보다 이후면 안됨
      const startDate = new Date(readingStartDate);
      const endDate = new Date(readingEndDate);
      if (startDate > endDate) {
        return false;
      }
    }
  }

  return true;
};

export const validateStep2 = (formData: BookFormData): boolean => {
  const { rating, description } = formData;
  if (!rating) return false;
  if (rating === 1 || rating === 5) {
    return typeof description === 'string' && description.length >= 100;
  }
  return true;
};

export const validateStep3 = (_formData: BookFormData): boolean => {
  return true;
};

export const validateStep4 = (_formData: BookFormData): boolean => {
  return true;
};

// 모든 검증
export const validateUpToStep = (
  step: number,
  formData: BookFormData
): boolean => {
  switch (step) {
    case 1:
      return validateStep1(formData);
    case 2:
      return validateStep1(formData) && validateStep2(formData);
    case 3:
      return (
        validateStep1(formData) &&
        validateStep2(formData) &&
        validateStep3(formData)
      );
    case 4:
      return (
        validateStep1(formData) &&
        validateStep2(formData) &&
        validateStep3(formData) &&
        validateStep4(formData)
      );
    default:
      return false;
  }
};
