import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/button/Button';

// Mock 데이터 - 실제로는 API에서 가져올 수 있음
const MOCK_TOTAL_PAGES = 300;

export default function Step4() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const quotes = watch('quotes') || [];
  const showPageNumbers = quotes.length >= 2;

  const addQuote = () => {
    append({ text: '', pageNumber: undefined });
  };

  const removeQuote = (index: number) => {
    remove(index);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 4: 인용구</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">인용구 목록</h3>
          <Button
            type="button"
            onClick={addQuote}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            인용구 추가
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 mb-4 rounded">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">인용구 {index + 1}</h4>
              <Button
                type="button"
                onClick={() => removeQuote(index)}
                className="text-red-500 hover:text-red-700"
              >
                삭제
              </Button>
            </div>

            <Input
              name={`quotes.${index}.text`}
              label="인용구 내용"
              placeholder="인용구를 입력하세요"
              className="mb-3"
            />

            {showPageNumbers && (
              <Input
                name={`quotes.${index}.pageNumber`}
                label="페이지 번호"
                type="number"
                placeholder={`1-${MOCK_TOTAL_PAGES} 범위의 페이지 번호`}
                min="1"
                max={MOCK_TOTAL_PAGES.toString()}
                required
              />
            )}
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            인용구가 없습니다. &ldquo;인용구 추가&rdquo; 버튼을 클릭하여
            인용구를 추가해보세요.
          </div>
        )}

        {showPageNumbers && (
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-700">
              💡 인용구가 2개 이상이므로 모든 인용구에 페이지 번호가 필수입니다.
              <br />
              페이지 번호는 1부터 {MOCK_TOTAL_PAGES}까지 입력 가능합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
