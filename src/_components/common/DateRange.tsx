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
}: DateRangeProps) {
  const { watch, setValue } = useFormContext();
  const startDate = watch(startName);
  const endDate = watch(endName);

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
          min={startMinDate}
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
