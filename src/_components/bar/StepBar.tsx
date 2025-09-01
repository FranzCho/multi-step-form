import { useFormContext } from 'react-hook-form';
import StepButton from '../common/button/StepButton';
import { validateUpToStep } from '../../utils/stepValidation';

interface StepBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { id: 1, label: '도서정보' },
  { id: 2, label: '도서 추천여부/별점' },
  { id: 3, label: '추가설정' },
  { id: 4, label: '미리보기' },
  { id: 5, label: '완료' },
];

export default function StepBar({ currentStep, setCurrentStep }: StepBarProps) {
  const { watch } = useFormContext();
  const formData = watch();

  const isStepAccessible = (stepId: number) => {
    if (stepId === currentStep) return true;

    if (stepId < currentStep) return true;

    return validateUpToStep(stepId - 1, formData);
  };

  const handleStepClick = (stepId: number) => {
    if (isStepAccessible(stepId)) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="flex gap-[20px] p-4">
      {steps.map(({ id, label }) => (
        <StepButton
          key={id}
          page={label}
          isActive={currentStep === id}
          disabled={!isStepAccessible(id)}
          onClick={() => handleStepClick(id)}
        />
      ))}
    </div>
  );
}
