import React from 'react';
import { useFormContext } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  className?: string;
  required?: boolean;
}

export default function RadioGroup({
  name,
  label,
  options,
  className = '',
  required = false,
}: RadioGroupProps) {
  const { register } = useFormContext();

  return (
    <div className={`mb-4 ${className}`}>
      <fieldset>
        <legend className="block mb-2 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}