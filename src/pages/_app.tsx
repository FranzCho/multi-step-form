import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect } from 'react';

// Context Provider
// import { FormProvider } from '../contexts/FormContext';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleResize = () => {
      console.log(`현재 브라우저 width: ${window.innerWidth}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="common-layout flex flex-col min-h-screen justify-between">
      <header className="border flex justify-center">애플리케이션 헤더</header>
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <footer className="border flex justify-center">애플리케이션 푸터</footer>
    </div>
  );
}
