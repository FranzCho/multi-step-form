import React from 'react';

interface Props {
  page: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StepButton({ page, isActive = false, onClick }: Props) {
  const buttonClasses = isActive
    ? 'w-[32px] h-[32px] border border-[#1e1e1e] rounded-[6px] bg-black text-white cursor-pointer transition-colors duration-200'
    : 'w-[32px] h-[32px] border border-[#1e1e1e] rounded-[6px] bg-white text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200';

  return (
    <button className={buttonClasses} onClick={onClick} type="button">
      {page}
    </button>
  );
}
