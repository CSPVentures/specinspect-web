import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CompareProvider } from '@/components/CompareProvider';
import CompareTray from '@/components/CompareTray';
import { getSession } from '@/lib/session';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'SpecInspect — Construction Specification Intelligence', template: '%s · SpecInspect' },
  description:
    'Search 30,000+ verified building material products, compare specs, and generate professional submittal PDF packages.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body className="font-sans flex min-h-screen flex-col">
        <CompareProvider>
          <Navbar user={user} />
          <main className="flex-1">{children}</main>
          <CompareTray />
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
