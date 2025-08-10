import BookSection from '@/_components/section/BookSection';
import MobileSection from '@/_components/section/MobileSection';

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex p-[20px]">
        <BookSection />
      </div>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <MobileSection />
      </div>
    </div>
  );
}
