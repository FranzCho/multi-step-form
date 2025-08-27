import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import BookSection from '@/_components/section/BookSection';
import MobileSection from '@/_components/section/MobileSection';

export default function Home() {
  const methods = useForm(); // 1. 일단 빈 값으로 초기화
  const watchAll = methods.watch();
  const [preview, setPreview] = useState(watchAll);

  // 2. 클라이언트에서만 localStorage 값으로 reset
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookForm');
      if (saved) {
        methods.reset(JSON.parse(saved));
      }
    }
    // eslint-disable-next-line
  }, []);

  // 3. watchAll이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    const handler = setTimeout(() => {
      setPreview(watchAll);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookForm', JSON.stringify(watchAll));
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [watchAll]);

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex p-[20px]">
        <FormProvider {...methods}>
          <BookSection setPreview={setPreview} />
        </FormProvider>
      </div>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <MobileSection preview={preview} />
      </div>
    </div>
  );
}
