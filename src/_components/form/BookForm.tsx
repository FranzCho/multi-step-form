'use client';
import { useEffect, useState, useMemo } from 'react';
import StepBar from '../bar/StepBar';
import Step1 from '../steps/step1';
import Step2 from '../steps/step2';
import Step3 from '../steps/Step3';
import Step4 from '../steps/Step4';
import Step5 from '../steps/Step5';
import SwitchCases from '../common/SwitchCases';
import { useFormContext } from 'react-hook-form';

interface Props {
  setPreview: (data: unknown) => void;
}

export default function BookForm({ setPreview }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const { watch } = useFormContext();
  const watchAll = watch();

  const watchAllString = JSON.stringify(watchAll);
  const memoizedWatchAll = useMemo(() => watchAll, [watchAllString]);

  useEffect(() => {
    setPreview(memoizedWatchAll);
  }, [memoizedWatchAll, setPreview]);

  return (
    <div className="border w-full flex flex-col">
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {/* 현재 스텝에 해당하는 폼 내용을 렌더링 */}
      <div className="flex-1">
        <SwitchCases
          value={currentStep}
          cases={{
            1: <Step1 />,
            2: <Step2 />,
            3: <Step3 />,
            4: <Step4 />,
            5: <Step5 />,
          }}
          defaultCase={<Step1 />}
        />
      </div>
    </div>
  );
}
