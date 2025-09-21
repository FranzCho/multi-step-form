// BookSection.tsx
import BookForm from '../form/BookForm';

interface BookSectionProps {
  setPreview: (data: unknown) => void;
}

export default function BookSection({ setPreview }: BookSectionProps) {
  return <BookForm setPreview={setPreview} />;
}
