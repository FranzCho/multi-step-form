import React from 'react';
import MobileForm from '../form/MobileForm';

export default function MobileSection() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        <div className="w-[320px] h-[690px] bg-[#1d1d1f] rounded-[55px] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[48px] overflow-hidden">
            {/* 정보 표시 영역 */}
            <div className="h-[38px] bg-gray-500" />
            <MobileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
