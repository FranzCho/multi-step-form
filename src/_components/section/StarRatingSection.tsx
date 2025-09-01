import { useFormContext } from 'react-hook-form';
import StarIcon from '../ui/StarIcon';

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
        <div className="relative">
          <StarIcon filled={isFullStar} halfFilled={isHalfStar} />
          <div
            className="absolute top-0 left-0 w-1/2 h-full"
            onClick={() => handleStarClick(starValue - 0.5)}
          />
          <div
            className="absolute top-0 right-0 w-1/2 h-full"
            onClick={() => handleStarClick(starValue)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className="ml-3 text-gray-600">({rating}/5)</span>
    </div>
  );
}
