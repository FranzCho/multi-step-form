import React from 'react';
import Input from './Input';

interface DateRangeProps {
  startName: string;
  endName: string;
  label: string;
  startLabel?: string;
  endLabel?: string;
  required?: boolean;
  className?: string;
}

export default function DateRange({
  startName,
  endName,
  label,
  startLabel = '시작일',
  endLabel = '종료일',
  required = false,
  className = '',
}: DateRangeProps) {
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
        />
        <Input
          name={endName}
          label={endLabel}
          type="date"
          placeholder=""
        />
      </div>
    </div>
  );
}