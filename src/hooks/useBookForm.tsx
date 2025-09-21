import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookFormSchema, BookFormData } from '../schemas/bookFormSchema';

export function useBookForm(): {
  methods: UseFormReturn<BookFormData>;
  preview: Record<string, unknown>;
  handleSetPreview: (data: unknown) => void;
  isClient: boolean;
} {
  const [isClient, setIsClient] = useState(false);
  const methods = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    mode: 'onChange', // 실시간 검증
  });
  const watchAll = methods.watch();
  const [preview, setPreview] = useState(watchAll);

  const handleSetPreview = useCallback((data: unknown) => {
    setPreview(data as typeof watchAll);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('bookForm');
    console.log('복원할 데이터:', saved);
    if (saved) {
      const parsedData = JSON.parse(saved);
      console.log('파싱된 데이터:', parsedData);
      methods.reset(parsedData);
    }
  }, [methods]);

  useEffect(() => {
    if (!isClient) return;

    const handler = setTimeout(() => {
      setPreview(watchAll);
      console.log('저장할 데이터:', watchAll);
      localStorage.setItem('bookForm', JSON.stringify(watchAll));
    }, 500);

    return () => clearTimeout(handler);
  }, [watchAll, isClient]);

  // 첫 번째 에러 필드로 자동 포커스
  useEffect(() => {
    const errors = methods.formState.errors;
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;

      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [methods.formState.errors]);

  return { methods, preview, handleSetPreview, isClient };
}
