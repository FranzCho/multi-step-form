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
  height,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={`${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        style={{ height: height }}
      />
    </div>
  );
}
