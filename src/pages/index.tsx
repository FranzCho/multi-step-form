import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import BookSection from '@/_components/section/BookSection';
import MobileSection from '@/_components/section/MobileSection';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const methods = useForm();
  const watchAll = methods.watch();
  const [preview, setPreview] = useState(watchAll);

  const handleSetPreview = useCallback((data: unknown) => {
    setPreview(data);
  }, []);

  // 클라이언트 마운트 확인
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('bookForm');
    console.log('복원할 데이터:', saved);
    if (saved) {
      const parsedData = JSON.parse(saved);
      console.log('파싱된 데이터:', parsedData);
      methods.reset(parsedData);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handler = setTimeout(() => {
      setPreview(watchAll);
      console.log('저장할 데이터:', watchAll);
      localStorage.setItem('bookForm', JSON.stringify(watchAll));
    }, 500);
    return () => clearTimeout(handler);
  }, [watchAll, isClient]);

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
