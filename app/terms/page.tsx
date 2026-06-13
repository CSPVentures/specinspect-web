import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Terms of service' };

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" updated="June 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using SpecInspect (&ldquo;the Service&rdquo;), operated by SpecInspect LLC, you agree to
          be bound by these Terms of Service. If you do not agree, do not use the Service.
          These terms apply to all users, including free and paid subscribers.
        </p>
      </section>

      <section>
        <h2>2. Account Requirements</h2>
        <ul>
          <li>You must be at least 13 years old to create an account.</li>
          <li>One account per person. Accounts are non-transferable.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.</li>
          <li>Notify us immediately at <a href="mailto:legal@specinspect.com" className="text-gold hover:underline">legal@specinspect.com</a> if you suspect unauthorized access to your account.</li>
        </ul>
      </section>

      <section>
        <h2>3. Acceptable Use</h2>
        <p>You agree to use SpecInspect for lawful purposes in connection with the construction industry. You may not:</p>
        <ul>
          <li>Scrape, crawl, or bulk-download the product database by any automated means outside of licensed API access.</li>
          <li>Resell, redistribute, or sublicense product data to third parties.</li>
          <li>Use the Service to build a competing product database.</li>
          <li>Attempt to circumvent authentication, rate limits, or access controls.</li>
          <li>Use the Service in any way that violates applicable laws or regulations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Subscription Terms</h2>
        <ul>
          <li>The Pro plan is available for <strong>$14.99/month</strong> or <strong>$119/year</strong>, billed in advance. Introductory launch pricing of <strong>$12.99/month</strong> or <strong>$99/year</strong> is available for the first 60 days.</li>
          <li>Subscriptions auto-renew unless cancelled before the renewal date.</li>
          <li>You may cancel your subscription at any time via Account settings. Cancellation takes effect at the end of the current billing period — access continues until then.</li>
          <li>We do not offer refunds for partial billing periods.</li>
          <li>We reserve the right to change pricing with at least 30 days&apos; notice to existing subscribers.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          SpecInspect owns the platform, codebase, and the compilation of the product database, including the
          structure, indexing, and search engine. Manufacturer technical data sheets (TDS) and product specifications
          are the property of their respective manufacturers; we display them for informational reference purposes
          consistent with fair use. SpecInspect does not claim ownership of individual manufacturer documents.
        </p>
      </section>

      <section>
        <h2>6. Disclaimer — Spec Data Accuracy</h2>
        <p>
          Product specifications in SpecInspect are compiled from manufacturer technical data sheets and other
          published sources. We verify data and mark verified entries, but specifications change and errors can occur.
        </p>
        <p>
          <strong>Always verify critical spec values — application temperature, cure time, substrate compatibility,
          VOC content — against the manufacturer&apos;s current published TDS before specifying or applying any product
          on a real project.</strong> SpecInspect is a research and productivity tool, not a substitute for
          professional judgment or manufacturer documentation.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          The Service is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. To the fullest
          extent permitted by applicable law, SpecInspect LLC shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages arising from your use of or reliance on the Service.
          Our total liability to you for any claim arising from your use of the Service shall not exceed
          the amounts you paid to SpecInspect in the twelve months preceding the claim.
        </p>
      </section>

      <section>
        <h2>8. Termination</h2>
        <p>
          You may cancel your account at any time. We reserve the right to suspend or terminate accounts that
          violate these Terms, with or without notice. Upon termination, your right to use the Service ceases
          immediately. Sections 5, 6, 7, and 9 of these Terms survive termination.
        </p>
      </section>

      <section>
        <h2>9. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of New York, without regard to conflict of law principles.
          Any dispute arising under or related to these Terms shall be resolved exclusively in the state or federal
          courts located in Queens County, New York. You consent to the personal jurisdiction of such courts.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          Legal inquiries:{' '}
          <a href="mailto:legal@specinspect.com" className="text-gold hover:underline">legal@specinspect.com</a>
        </p>
      </section>
    </StaticPage>
  );
}
