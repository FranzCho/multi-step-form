import React from 'react';
import Input from '../common/Input';
import RadioGroup from '../common/RadioGroup';
import DateRange from '../common/DateRange';
import { READING_STATUS_OPTIONS } from '../../utils/constants';

export default function Step1() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 1: 기본 정보</h2>
      <RadioGroup
        name="readingStatus"
        label="독서 상태"
        options={READING_STATUS_OPTIONS}
        required={true}
      />
      <Input
        name="title"
        label="도서 제목"
        placeholder="도서 제목을 입력하세요"
      />

      <Input
        name="author"
        label="도서 작가"
        placeholder="도서 작가를 입력하세요"
      />

      <Input
        name="publicationDate"
        label="도서 출판일"
        type="date"
        placeholder="도서 출판일을 입력하세요"
      />
      <DateRange
        startName="readingStartDate"
        endName="readingEndDate"
        label="독서 기간"
      />
    </div>
  );
}
