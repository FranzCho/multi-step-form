import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  type?: 'text' | 'date' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  height?: string;
}

export default function Input({
  name,
  label,
  type = 'text',
  placeholder,
  className = 'border p-2 w-full',
  required = false,
  disabled = false,
  min,
  max,
  height,
}: InputProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
        className={`${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${errors[name] ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'focus:ring-2 focus:ring-blue-200'}`}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        style={{ height: height }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
