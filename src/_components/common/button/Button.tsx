import React from 'react';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type: 'prev' | 'next' | 'button';
  children?: React.ReactNode;
}

export default function Button({ type, children, ...props }: ButtonProps) {
  const label = type === 'prev' ? '이전' : type === 'next' ? '다음' : undefined;
  const baseClass =
    type === 'prev'
      ? 'px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
      : type === 'next'
        ? 'px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
        : 'px-4 py-2 rounded disabled:opacity-50';

  return (
    <button
      {...props}
      className={baseClass + (props.className ? ` ${props.className}` : '')}
    >
      {type === 'button' ? children : label}
    </button>
  );
}
