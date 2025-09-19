import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export function useBookForm(): {
  methods: UseFormReturn;
  preview: Record<string, unknown>;
  handleSetPreview: (data: unknown) => void;
  isClient: boolean;
} {
  const [isClient, setIsClient] = useState(false);
  const methods = useForm();
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

  return { methods, preview, handleSetPreview, isClient };
}
