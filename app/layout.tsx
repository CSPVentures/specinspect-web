import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CompareProvider } from '@/components/CompareProvider';
import CompareTray from '@/components/CompareTray';
import { getSession } from '@/lib/session';

export const metadata: Metadata = {
  title: { default: 'SpecInspect — Construction Specification Intelligence', template: '%s · SpecInspect' },
  description:
    'Search 30,000+ verified building material products, compare specs, and generate professional submittal PDF packages.',
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('si-theme');
    var theme = stored || 'dark';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) { document.documentElement.classList.add('dark'); }
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
