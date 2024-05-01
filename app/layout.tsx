import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ECOMM DEMO',
  description: 'Learn Building EComm App using Next JS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyrights (c) 2024 - All right reserved by ECOM - DEMO</p>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
