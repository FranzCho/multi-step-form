import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  type?: 'text' | 'date' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function Input({
  name,
  label,
  type = 'text',
  placeholder,
  className = 'border p-2 w-full',
  required = false,
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
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}