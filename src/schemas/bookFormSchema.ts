import { z } from 'zod';

// 날짜 검증을 위한 custom refinement
const dateString = z
  .string()
  .min(1, '날짜를 입력해주세요')
  .refine(
    (val) => !isNaN(new Date(val).getTime()),
    '올바른 날짜 형식을 입력해주세요'
  );

// 독서 상태 enum
const readingStatusSchema = z.enum([
  'reading',
  'completed',
  'on_hold',
  'to_read',
]);

// Step 1 스키마
const step1Schema = z
  .object({
    readingStatus: readingStatusSchema,
    title: z.string().min(1, '도서 제목을 입력해주세요'),
    author: z.string().min(1, '저자를 입력해주세요'),
    publicationDate: dateString,
    readingStartDate: z.string().optional(),
    readingEndDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { readingStatus, publicationDate, readingStartDate, readingEndDate } =
      data;

    // 독서 상태별 시작일 검증
    if (['reading', 'completed', 'on_hold'].includes(readingStatus)) {
      if (!readingStartDate || readingStartDate.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '독서 시작일을 입력해주세요',
          path: ['readingStartDate'],
        });
        return;
      }

      if (isNaN(new Date(readingStartDate).getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '올바른 날짜 형식을 입력해주세요',
          path: ['readingStartDate'],
        });
        return;
      }

      // 독서 시작일은 출판일 이후여야 함
      const pubDate = new Date(publicationDate);
      const startDate = new Date(readingStartDate);
      if (startDate < pubDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '독서 시작일은 출판일 이후여야 합니다',
          path: ['readingStartDate'],
        });
      }

      // '읽음' 상태일 때 종료일 검증
      if (readingStatus === 'completed') {
        if (!readingEndDate || readingEndDate.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '독서 완료일을 입력해주세요',
            path: ['readingEndDate'],
          });
          return;
        }

        if (isNaN(new Date(readingEndDate).getTime())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '올바른 날짜 형식을 입력해주세요',
            path: ['readingEndDate'],
          });
          return;
        }

        // 시작일은 종료일보다 이후면 안됨
        const endDate = new Date(readingEndDate);
        if (startDate > endDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '독서 시작일은 완료일보다 이전이어야 합니다',
            path: ['readingStartDate'],
          });
        }
      }
    }
  });

// Step 2 스키마
const step2Schema = z
  .object({
    rating: z
      .number({ message: '평점을 선택해주세요' })
      .min(1, '평점은 1점 이상이어야 합니다')
      .max(5, '평점은 5점 이하여야 합니다'),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { rating, description } = data;

    // 1점 또는 5점일 때는 100자 이상의 설명 필수
    if (rating === 1 || rating === 5) {
      if (!description || description.trim().length < 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            '1점 또는 5점 평점에는 100자 이상의 상세한 설명이 필요합니다',
          path: ['description'],
        });
      }
    }
  });

// Mock 데이터
const MOCK_TOTAL_PAGES = 300;

// Step 3 스키마 (추후 확장)
const step3Schema = z.object({});

// Step 4 스키마 - 인용구
const step4Schema = z
  .object({
    quotes: z
      .array(
        z.object({
          text: z.string().min(1, '인용구 내용을 입력해주세요'),
          pageNumber: z.number().optional(),
        })
      )
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    const { quotes = [] } = data;

    // 인용구가 2개 이상일 때 페이지 번호 필수 검증
    if (quotes.length >= 2) {
      quotes.forEach((quote, index) => {
        if (!quote.pageNumber) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '인용구가 2개 이상일 때는 페이지 번호가 필수입니다',
            path: ['quotes', index, 'pageNumber'],
          });
        } else {
          // 페이지 번호 범위 검증
          if (quote.pageNumber < 1 || quote.pageNumber > MOCK_TOTAL_PAGES) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `페이지 번호는 1부터 ${MOCK_TOTAL_PAGES}까지 입력 가능합니다`,
              path: ['quotes', index, 'pageNumber'],
            });
          }
        }
      });
    } else {
      // 인용구가 1개 이하일 때도 페이지 번호가 있다면 범위 검증
      quotes.forEach((quote, index) => {
        if (quote.pageNumber && (quote.pageNumber < 1 || quote.pageNumber > MOCK_TOTAL_PAGES)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `페이지 번호는 1부터 ${MOCK_TOTAL_PAGES}까지 입력 가능합니다`,
            path: ['quotes', index, 'pageNumber'],
          });
        }
      });
    }
  });

// Step 5 스키마 (추후 확장)
const step5Schema = z.object({});

// 전체 폼 스키마
export const bookFormSchema = z.object({
  // Step 1 필드들
  readingStatus: readingStatusSchema.optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  publicationDate: z.string().optional(),
  readingStartDate: z.string().optional(),
  readingEndDate: z.string().optional(),

  // Step 2 필드들
  rating: z.number().optional(),
  description: z.string().optional(),

  // Step 3 필드들
  review: z.string().optional(),

  // Step 4 필드들
  quotes: z
    .array(
      z.object({
        text: z.string().optional(),
        pageNumber: z.number().optional(),
      })
    )
    .optional(),

  // 추후 확장을 위한 필드
});

// 스텝별 검증 스키마
export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
} as const;

// TypeScript 타입 추출
export type BookFormData = z.infer<typeof bookFormSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;

// 스텝별 검증 함수
export const validateStep = (
  stepNumber: number,
  data: Partial<BookFormData>
) => {
  const schema = stepSchemas[stepNumber as keyof typeof stepSchemas];
  if (!schema) return { success: false, errors: ['Invalid step number'] };

  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((err) => ({
      path: err.path,
      message: err.message,
    })),
  };
};

// 여러 스텝까지 검증하는 함수
export const validateUpToStep = (
  targetStep: number,
  data: Partial<BookFormData>
) => {
  for (let step = 1; step <= targetStep; step++) {
    const validation = validateStep(step, data);
    if (!validation.success) {
      return { success: false, step, errors: validation.errors };
    }
  }
  return { success: true };
};
