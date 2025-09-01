import { useFormContext } from 'react-hook-form';
import StarRatingSection from '../section/StarRatingSection';
import Textarea from '../common/Textarea';

export default function Step2() {
  const { watch } = useFormContext();
  const rating = watch('rating');

  const isTextareaEnabled = rating === 1 || rating === 5;

  return (
    <div className="p-6 flex flex-col gap-[10px] h-full">
      <h2 className="text-xl font-bold mb-4">Step 2: 별점</h2>
      <section className="flex flex-col gap-[20px] flex-1">
        <StarRatingSection />
        <Textarea
          name="description"
          label="추천 이유 (1점 & 5점을 부여했을 경우에만 작성)"
          placeholder={
            isTextareaEnabled
              ? '별점을 준 이유를 작성해주세요'
              : '1점 또는 5점을 선택하면 작성할 수 있습니다'
          }
          height="full"
          disabled={!isTextareaEnabled}
          minLength={100}
        />
      </section>
    </div>
  );
}
