import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VowGuard - Wedding Photography Payment Protection',
  description: '100% payment protection against photographer ghosting, no-shows, and emergencies. Book wedding photography with complete confidence.',
  keywords: 'wedding photography, payment protection, photographer insurance, wedding vendors, VowGuard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}