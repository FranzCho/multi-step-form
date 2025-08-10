import StepButton from '../common/button/StepButton';

interface StepBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function StepBar({ currentStep, setCurrentStep }: StepBarProps) {
  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="flex gap-[20px] p-4">
      <StepButton
        page="1"
        isActive={currentStep === 1}
        onClick={() => handleStepClick(1)}
      />
      <StepButton
        page="2"
        isActive={currentStep === 2}
        onClick={() => handleStepClick(2)}
      />
      <StepButton
        page="3"
        isActive={currentStep === 3}
        onClick={() => handleStepClick(3)}
      />
      <StepButton
        page="4"
        isActive={currentStep === 4}
        onClick={() => handleStepClick(4)}
      />
      <StepButton
        page="5"
        isActive={currentStep === 5}
        onClick={() => handleStepClick(5)}
      />
    </div>
  );
}
