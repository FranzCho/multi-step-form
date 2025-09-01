import React from 'react';

interface Props {
  page: string;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function StepButton({
  page,
  isActive = false,
  onClick,
  disabled = false,
}: Props) {
  const getButtonClasses = () => {
    if (disabled) {
      return 'w-full h-[32px] border border-gray-300 rounded-[6px] bg-gray-100 text-gray-400 cursor-not-allowed transition-colors duration-200';
    }
    if (isActive) {
      return 'w-full h-[32px] border border-[#1e1e1e] rounded-[6px] bg-black text-white cursor-pointer transition-colors duration-200';
    }
    return 'w-full h-[32px] border border-[#1e1e1e] rounded-[6px] bg-white text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200';
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={disabled ? undefined : onClick}
      type="button"
      disabled={disabled}
    >
      {page}
    </button>
  );
}
