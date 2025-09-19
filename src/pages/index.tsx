import { FormProvider } from 'react-hook-form';
import BookSection from '@/_components/section/BookSection';
import MobileSection from '@/_components/section/MobileSection';
import { useBookForm } from '@/hooks/useBookForm';

export default function Home() {
  const { methods, preview, handleSetPreview } = useBookForm();

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex p-[20px]">
        <FormProvider {...methods}>
          <BookSection setPreview={handleSetPreview} />
        </FormProvider>
      </div>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <MobileSection preview={preview} />
      </div>
    </div>
  );
}
