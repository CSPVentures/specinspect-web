import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Accessibility' };

export default function AccessibilityPage() {
  return (
    <StaticPage title="Accessibility Statement" updated="June 2026">
      <section>
        <h2>1. Our Commitment</h2>
        <p>
          SpecInspect is committed to making our platform accessible to everyone, including people who rely on
          assistive technologies. We target conformance with <strong>WCAG 2.1 Level AA</strong> across the
          application. Accessibility is an ongoing effort — we welcome feedback and work to resolve issues promptly.
        </p>
      </section>

      <section>
        <h2>2. What We&apos;ve Done</h2>
        <ul>
          <li><strong>Keyboard navigation:</strong> All interactive elements — links, buttons, form fields, search, modals — are fully operable by keyboard without requiring a mouse.</li>
          <li><strong>Focus indicators:</strong> Every interactive element has a visible focus ring (gold outline) that meets AA contrast requirements.</li>
          <li><strong>Color contrast:</strong> Text colors meet WCAG AA contrast ratios against our dark backgrounds. Primary text (#E2E8F0 on #020817) achieves a contrast ratio above 7:1.</li>
          <li><strong>Semantic HTML:</strong> We use heading hierarchy (h1 → h2 → h3), landmark regions (header, main, footer, nav), and semantic list elements throughout.</li>
          <li><strong>ARIA attributes:</strong> Modals use <code>role=&quot;dialog&quot;</code> and <code>aria-modal</code>. Status messages use <code>role=&quot;status&quot;</code> and <code>role=&quot;alert&quot;</code>. Navigation uses <code>aria-label</code>.</li>
          <li><strong>Descriptive alt text:</strong> All meaningful images have descriptive alt text. Decorative images have empty alt attributes.</li>
          <li><strong>Reduced motion:</strong> Animations and transitions are disabled automatically when your system has &ldquo;reduce motion&rdquo; enabled.</li>
          <li><strong>Form labels:</strong> All form inputs have associated <code>&lt;label&gt;</code> elements. Required fields are marked semantically.</li>
        </ul>
      </section>

      <section>
        <h2>3. Known Limitations</h2>
        <ul>
          <li>
            <strong>Third-party PDFs:</strong> Manufacturer technical data sheets (TDS) linked from product pages are
            third-party documents outside our control. Many are scanned documents without searchable text or accessible
            structure. Where possible, we surface the same specification data in our accessible on-page tables.
          </li>
          <li>
            <strong>Mobile screen reader optimization:</strong> We are actively testing and improving VoiceOver (iOS)
            and TalkBack (Android) compatibility in the mobile web app. Some complex interactions (compare tray, typeahead search)
            may have limited screen reader support on mobile.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. In Progress</h2>
        <ul>
          <li>Improved ARIA live region announcements for search results and save confirmations.</li>
          <li>Skip navigation link at page top for keyboard users.</li>
          <li>Enhanced screen reader testing on the compare table and weather check flow.</li>
        </ul>
      </section>

      <section>
        <h2>5. Feedback</h2>
        <p>
          If you encounter an accessibility barrier anywhere in SpecInspect, please contact us at{' '}
          <a href="mailto:accessibility@specinspect.com" className="text-gold hover:underline">
            accessibility@specinspect.com
          </a>
          . Please describe the barrier, the page where you encountered it, and the assistive technology you
          were using. We aim to respond within <strong>5 business days</strong> and to address critical barriers
          within 30 days.
        </p>
      </section>
    </StaticPage>
  );
}
