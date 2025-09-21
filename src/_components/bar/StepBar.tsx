import { useFormContext } from 'react-hook-form';
import StepButton from '../common/button/StepButton';
import Button from '../common/button/Button';
import { validateUpToStep } from '../../schemas/bookFormSchema';

interface StepBarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { id: 1, label: '도서정보' },
  { id: 2, label: '추천여부/별점' },
  { id: 3, label: '독후감' },
  { id: 4, label: '인용구' },
  { id: 5, label: '공개여부' },
];

// SwitchCases 유틸 컴포넌트 예시
function SwitchCases<T extends string>({
  value,
  cases,
  defaultCase,
}: {
  value: T;
  cases: Record<T, React.ReactNode>;
  defaultCase?: React.ReactNode;
}) {
  return (cases[value] ?? defaultCase) || null;
}

export default function StepBar({ currentStep, setCurrentStep }: StepBarProps) {
  const { watch } = useFormContext();
  const formData = watch();

  // 현재 스텝의 인덱스 구하기
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  // 이전 스텝 id
  const prevStepId = currentIndex > 0 ? steps[currentIndex - 1].id : null;
  // 다음 스텝 id
  const nextStepId =
    currentIndex < steps.length - 1 ? steps[currentIndex + 1].id : null;

  // step key 생성 (예: step1, step2 ...)
  const stepKey = `step${currentStep}` as keyof typeof stepCases;

  // 각 스텝별 버튼 렌더링
  const stepCases = {
    step1: (
      <StepButton
        page={steps[0].label}
        isActive={true}
        disabled={false}
        onClick={() => setCurrentStep(steps[0].id)}
      />
    ),
    step2: (
      <StepButton
        page={steps[1].label}
        isActive={true}
        disabled={false}
        onClick={() => setCurrentStep(steps[1].id)}
      />
    ),
    step3: (
      <StepButton
        page={steps[2].label}
        isActive={true}
        disabled={false}
        onClick={() => setCurrentStep(steps[2].id)}
      />
    ),
    step4: (
      <StepButton
        page={steps[3].label}
        isActive={true}
        disabled={false}
        onClick={() => setCurrentStep(steps[3].id)}
      />
    ),
    step5: (
      <StepButton
        page={steps[4].label}
        isActive={true}
        disabled={false}
        onClick={() => setCurrentStep(steps[4].id)}
      />
    ),
  };

  return (
    <>
      <div className="flex gap-[20px] p-4">
        <SwitchCases value={stepKey} cases={stepCases} />
      </div>
      <div className="flex justify-between mt-4 px-[20px]">
        <Button
          type="prev"
          onClick={() => prevStepId && setCurrentStep(prevStepId)}
          disabled={prevStepId === null}
        />
        <Button
          type="next"
          onClick={() => nextStepId && setCurrentStep(nextStepId)}
          disabled={
            nextStepId === null || !validateUpToStep(currentStep, formData).success
          }
        />
      </div>
    </>
  );
}
