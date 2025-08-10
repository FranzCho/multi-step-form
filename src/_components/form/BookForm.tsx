'use client';
import { useState } from 'react';
import StepBar from '../bar/StepBar';
import Step1 from '../steps/step1';
import Step2 from '../steps/step2';
import Step3 from '../steps/Step3';
import Step4 from '../steps/Step4';
import Step5 from '../steps/Step5';

export default function BookForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="border w-full flex flex-col">
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {/* 현재 스텝에 해당하는 폼 내용을 렌더링 */}
      <div className="flex-1">{renderCurrentStep()}</div>
    </div>
  );
}
