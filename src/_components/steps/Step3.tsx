import React from 'react';
import { useFormContext } from 'react-hook-form';
import Textarea from '../common/Textarea';

export default function Step3() {
  const { register } = useFormContext();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 3: 독후감</h2>
      <Textarea
        label="독후감"
        placeholder="독후감을 입력하세요"
        height="full"
        {...register('review')}
      />
    </div>
  );
}
