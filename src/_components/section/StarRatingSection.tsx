import { useFormContext } from 'react-hook-form';

export default function StarRatingSection() {
  const { setValue, watch } = useFormContext();
  const rating = watch('rating') || 0;

  const handleStarClick = (value: number) => {
    setValue('rating', value);
  };

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const isFullStar = rating >= starValue;
    const isHalfStar = rating >= starValue - 0.5 && rating < starValue;

    return (
      <div key={starIndex} className="relative inline-block cursor-pointer">
        {/* 전체 별 (회색 배경) */}
        <div className="text-gray-300 text-3xl">★</div>
        
        {/* 절반 별 (왼쪽) */}
        <div 
          className="absolute top-0 left-0 overflow-hidden text-yellow-400 text-3xl"
          style={{ width: '50%' }}
          onClick={() => handleStarClick(starValue - 0.5)}
        >
          ★
        </div>
        
        {/* 전체 별 (오른쪽) */}
        <div 
          className="absolute top-0 left-0 overflow-hidden text-yellow-400 text-3xl"
          style={{ width: isFullStar ? '100%' : isHalfStar ? '50%' : '0%' }}
          onClick={() => handleStarClick(starValue)}
        >
          ★
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      <span className="text-lg font-medium mr-3">별점: </span>
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className="ml-3 text-gray-600">({rating}/5)</span>
    </div>
  );
}
