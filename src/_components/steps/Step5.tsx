import React from 'react';
import RadioGroup from '../common/RadioGroup';
import { VISIBILITY_OPTIONS } from '../../utils/constants';

export default function Step5() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 5: 공개여부</h2>
      <div className="space-y-4">
        <RadioGroup
          name="isPublic"
          label="공개 여부"
          options={VISIBILITY_OPTIONS}
          required={true}
        />
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">안내사항</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>공개</strong>: 작성한 독후감이 다른 사용자에게 공개됩니다.</li>
            <li>• <strong>비공개</strong>: 본인만 독후감을 확인할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
