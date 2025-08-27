import React from 'react';

export default function MobileForm({ preview }) {
  return (
    <div className="border">
      <p>모바일 전용 폼입니다.</p>
      <p>도서제목: {preview?.title}</p>
      <p>도서작가: {preview?.author}</p>
      {/* 필요하다면 다른 preview 값도 표시 */}
    </div>
  );
}
