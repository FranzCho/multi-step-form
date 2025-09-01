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
}: DateRangeProps) {
  const { watch, setValue } = useFormContext();
  const startDate = watch(startName);
  const endDate = watch(endName);

  // 종료일이 시작일보다 이전인 경우 자동 수정
  React.useEffect(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setValue(endName, startDate);
    }
  }, [startDate, endDate, setValue, endName]);

  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          name={startName}
          label={startLabel}
          type="date"
          placeholder=""
          disabled={startDisabled}
        />
        <Input
          name={endName}
          label={endLabel}
          type="date"
          placeholder=""
          disabled={endDisabled}
          min={startDate}
        />
      </div>
    </div>
  );
}