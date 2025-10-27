import type { Metadata } from 'next';
import { Underdog } from 'next/font/google';
import './globals.css';
import Header from './compoments/Header/Header';
import Footer from './compoments/Footer/Footer';

const underdog = Underdog({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Illustration',
  description: 'AI Illustration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${underdog.className}`}>
        <div className='wrapper'>
          <Header />
          <main className='main'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
