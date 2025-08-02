import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <h1 className={geistSans.className}>Welcome to the Multi-Step Form</h1>
      <p className={geistMono.className}>Please fill out the following steps:</p>
    </div>
  );
}
