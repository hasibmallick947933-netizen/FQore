import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/authContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'EduX Intel | Educational Business & Stock Market Intelligence',
  description:
    'Institutional-grade educational platform deconstructing business models, equity research, valuation frameworks, price action, and downloadable financial models.',
  openGraph: {
    title: 'EduX Intel | Business & Stock Market Academy',
    description: 'Learn Business. Understand Markets. Think Smarter.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#040711] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <AuthProvider>
          <DisclaimerBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
