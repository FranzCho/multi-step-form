import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from './Input';

interface DateRangeProps {
  startName: string;
  endName: string;
  label: string;
  startLabel?: string;
  endLabel?: string;
  required?: boolean;
  className?: string;
  startDisabled?: boolean;
  endDisabled?: boolean;
  startMinDate?: string;
  endMinDate?: string;
  publishDateName?: string;
  publishDateLabel?: string;
  hideEndDate?: boolean;
}

export default function DateRange({
  startName,
  endName,
  label,
  startLabel = '시작일',
  endLabel = '종료일',
  required = false,
  className = '',
  startDisabled = false,
  endDisabled = false,
  startMinDate,
  endMinDate,
  publishDateName,
  publishDateLabel = '도서출판일',
  hideEndDate = false,
}: DateRangeProps) {
  const { watch, setValue } = useFormContext();
  const startDate = watch(startName);
  const endDate = watch(endName);
  const publishDate = publishDateName ? watch(publishDateName) : undefined;

  // 종료일의 최소값: startDate 또는 endMinDate 중 더 나중 날짜
  const endMinimum = React.useMemo(() => {
    if (!startDate && !endMinDate) return undefined;
    if (!startDate) return endMinDate;
    if (!endMinDate) return startDate;
    const result =
      new Date(startDate) > new Date(endMinDate) ? startDate : endMinDate;
    return result;
  }, [startDate, endMinDate]);

  React.useEffect(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValue(endName, startDate);
    }
  }, [startDate, endDate, setValue, endName]);

  // startMinDate가 변경되었을 때 현재 startDate가 그보다 작으면 조정
  React.useEffect(() => {
    if (
      startMinDate &&
      startDate &&
      new Date(startDate) < new Date(startMinDate)
    ) {
      setValue(startName, startMinDate);
    }
  }, [startMinDate, startDate, setValue, startName]);

  // endMinimum이 변경되었을 때 현재 endDate가 그보다 작으면 조정
  React.useEffect(() => {
    if (endMinimum && endDate && new Date(endDate) < new Date(endMinimum)) {
      setValue(endName, endMinimum);
    }
  }, [endMinimum, endDate, setValue, endName]);

  // 도서출판일 클릭 시 시작일과 종료일을 모두 해당 날짜로 설정
  const handlePublishDateClick = React.useCallback(() => {
    if (publishDate) {
      setValue(startName, publishDate);
      setValue(endName, publishDate);
    }
  }, [publishDate, setValue, startName, endName]);

  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      {publishDateName && (
        <div className="mb-2">
          <Input
            name={publishDateName}
            label={publishDateLabel}
            type="date"
          />
          <button
            type="button"
            className="ml-2 px-2 py-1 border rounded text-xs"
            onClick={handlePublishDateClick}
            disabled={!publishDate}
          >
            출판일로 설정
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          key={`${startName}-${startMinDate}`}
          name={startName}
          label={startLabel}
          type="date"
          placeholder=""
          disabled={startDisabled}
          min={startMinDate}
        />
        {!hideEndDate && (
          <Input
            key={`${endName}-${endMinimum}`}
            name={endName}
            label={endLabel}
            type="date"
            placeholder=""
            disabled={endDisabled}
            min={endMinimum}
          />
        )}
      </div>
    </div>
  );
}
