import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  height?: string;
  minLength?: number;
}

export default function Textarea({
  name,
  label,
  placeholder,
  className = 'border p-2 w-full resize-none',
  required = false,
  disabled = false,
  rows = 4,
  height,
  minLength,
}: TextareaProps) {
  const { register, watch, formState: { errors } } = useFormContext();
  const value = watch(name) || '';
  const currentLength = value.length;

  return (
    <div className={`mb-4 ${height === 'full' ? 'flex flex-col flex-1' : ''}`}>
      <label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {minLength && (
          <span className={`text-sm ml-2 ${currentLength >= minLength ? 'text-green-600' : 'text-gray-500'}`}>
            ({currentLength}/{minLength}자)
          </span>
        )}
      </label>
      <textarea
        id={name}
        {...register(name, {
          minLength: minLength ? {
            value: minLength,
            message: `최소 ${minLength}자 이상 입력해주세요.`
          } : undefined
        })}
        className={`${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${height === 'full' ? 'flex-1' : ''} ${errors[name] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{ height: height !== 'full' ? height : undefined }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}