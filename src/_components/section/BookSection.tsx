import BookForm from '../form/BookForm';
import { FormProvider, useForm } from 'react-hook-form';

export default function BookSection() {
  const methods = useForm<FormData>({
    defaultValues: {},
    mode: 'onChange',
  });
  return (
    <div className="flex w-full h-auto">
      <FormProvider {...methods}>
        <BookForm />
      </FormProvider>
    </div>
  );
}
