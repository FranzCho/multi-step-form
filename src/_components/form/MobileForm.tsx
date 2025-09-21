import React from 'react';

interface MobileFormProps {
  preview?: Record<string, unknown>;
}

// 독서 상태를 한글로 변환하는 함수
const getReadingStatusText = (status: string) => {
  switch (status) {
    case 'reading':
      return '읽는 중';
    case 'completed':
      return '완료';
    case 'on_hold':
      return '보류';
    case 'to_read':
      return '읽을 예정';
    default:
      return status;
  }
};

// 날짜를 읽기 쉽게 포맷하는 함수
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ko-KR');
};

// 별점을 이모지로 변환하는 함수
const getStarRating = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function MobileForm({ preview }: MobileFormProps) {
  const quotes = Array.isArray(preview?.quotes) ? preview.quotes : [];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 px-2 py-3">
      <div className="space-y-3 pb-6">
        <div className="text-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md">
          <h3 className="font-bold text-base">📚 독서 기록</h3>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            도서 정보
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex">
              <span className="text-gray-500 w-12 shrink-0">제목</span>
              <span className="font-medium text-gray-800 break-words">
                {(preview?.title as string) || '제목 없음'}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-12 shrink-0">저자</span>
              <span className="font-medium text-gray-800">
                {(preview?.author as string) || '저자 없음'}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-12 shrink-0">출판</span>
              <span className="font-medium text-gray-800">
                {formatDate(preview?.publicationDate as string) || '-'}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-12 shrink-0">상태</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {getReadingStatusText(preview?.readingStatus as string) || '-'}
              </span>
            </div>
          </div>
        </div>

        {((preview?.readingStartDate as string) || (preview?.readingEndDate as string)) ? (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
              독서 기간
            </h4>
            <div className="space-y-2 text-xs">
              {preview?.readingStartDate ? (
                <div className="flex">
                  <span className="text-gray-500 w-12 shrink-0">시작</span>
                  <span className="font-medium text-gray-800">
                    {formatDate((preview.readingStartDate as string) ?? '')}
                  </span>
                </div>
              ) : null}
              {preview?.readingEndDate && preview?.readingStatus !== 'reading' ? (
                <div className="flex">
                  <span className="text-gray-500 w-12 shrink-0">완료</span>
                  <span className="font-medium text-gray-800">
                    {formatDate((preview.readingEndDate as string) ?? '')}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {preview?.rating ? (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
              평가
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">평점</span>
                <span className="text-sm font-medium">
                  {getStarRating(preview.rating as number)} ({(preview.rating as number)}/5)
                </span>
              </div>
              {preview?.description ? (
                <div>
                  <span className="text-gray-500 text-xs block mb-1">리뷰</span>
                  <div className="bg-gray-50 p-2 rounded-lg text-xs leading-relaxed">
                    {(preview.description as string)
                      .split('\n')
                      .map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-1' : ''}>
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {preview?.review ? (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
              독후감
            </h4>
            <div className="bg-amber-50 p-2 rounded-lg border-l-4 border-amber-400">
              <div className="text-xs leading-relaxed text-gray-700">
                {(preview.review as string).split('\n').map((line, index) => (
                  <p key={index} className={index > 0 ? 'mt-1' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {quotes.length > 0 && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
              인용구 ({quotes.length}개)
            </h4>
            <div className="space-y-2">
              {quotes.map(
                (
                  quote: { text?: string; pageNumber?: number },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="border-l-3 border-purple-300 pl-2"
                  >
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <p className="italic text-gray-700 text-xs leading-relaxed mb-1">
                        &ldquo;{quote?.text || '인용구 없음'}&rdquo;
                      </p>
                      {quote?.pageNumber ? (
                        <p className="text-right text-xs text-purple-600 font-medium">
                          p.{quote.pageNumber}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {!preview?.title &&
          !preview?.author &&
          quotes.length === 0 &&
          !preview?.review && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-3">📱</div>
              <p className="text-sm">폼을 작성하시면</p>
              <p className="text-sm">여기에 미리보기가 표시됩니다</p>
            </div>
          )}
      </div>
    </div>
  );
}
