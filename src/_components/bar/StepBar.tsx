import StepButton from '../common/button/StepButton';

interface StepBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { id: 1, label: '기본정보' },
  { id: 2, label: '상세정보' },
  { id: 3, label: '추가설정' },
  { id: 4, label: '미리보기' },
  { id: 5, label: '완료' },
];

export default function StepBar({ currentStep, setCurrentStep }: StepBarProps) {
  return (
    <div className="flex gap-[20px] p-4">
      {steps.map(({ id, label }) => (
        <StepButton
          key={id}
          page={label}
          isActive={currentStep === id}
          onClick={() => setCurrentStep(id)}
        />
      ))}
    </div>
  );
}
