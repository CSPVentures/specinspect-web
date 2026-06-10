import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Accessibility' };

export default function AccessibilityPage() {
  return (
    <StaticPage title="Accessibility Statement" updated="June 10, 2026">
      <section>
        <h2>Our commitment</h2>
        <p>
          SpecInspect is built to be usable by everyone, including people who rely on assistive
          technology. We aim to conform to WCAG 2.1 Level AA across the application.
        </p>
      </section>
      <section>
        <h2>What we&apos;ve done</h2>
        <ul>
          <li>Full keyboard navigation with visible focus indicators on every interactive element.</li>
          <li>Semantic HTML, labeled form fields, and ARIA attributes where appropriate.</li>
          <li>Color contrast meeting AA ratios in both dark and light themes.</li>
          <li>Reduced-motion support: animations are disabled when your system requests it.</li>
          <li>Status messages announced to screen readers during search and save actions.</li>
        </ul>
      </section>
      <section>
        <h2>Known limitations</h2>
        <p>
          Some manufacturer PDF documents linked from product pages are third-party files and may
          not be fully accessible. Where possible we surface the same data in the on-page
          specifications table.
        </p>
      </section>
      <section>
        <h2>Feedback</h2>
        <p>
          If you hit a barrier anywhere in SpecInspect, email{' '}
          <a href="mailto:accessibility@specinspect.com" className="text-orange hover:underline">
            accessibility@specinspect.com
          </a>{' '}
          and we will respond within two business days.
        </p>
      </section>
    </StaticPage>
  );
}
