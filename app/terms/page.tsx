import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Terms of service' };

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" updated="June 10, 2026">
      <section>
        <h2>The service</h2>
        <p>
          SpecInspect provides searchable building material product data, project organization
          tools, and submittal package generation. By creating an account you agree to these terms.
        </p>
      </section>
      <section>
        <h2>Product data</h2>
        <p>
          Product specifications are compiled from manufacturer technical data sheets and other
          published sources. We work to keep data accurate and mark verified entries, but
          specifications change. Always confirm critical values — application temperature, cure
          time, compatibility — against the manufacturer&apos;s current technical data sheet before
          specifying or installing a product. SpecInspect is a research tool, not a substitute for
          manufacturer documentation or professional judgment.
        </p>
      </section>
      <section>
        <h2>Your account</h2>
        <ul>
          <li>You are responsible for activity under your account and for keeping your password secure.</li>
          <li>One account per person. Team plans are available under Enterprise.</li>
          <li>Automated scraping of the product database is not permitted outside of licensed API access.</li>
        </ul>
      </section>
      <section>
        <h2>Liability</h2>
        <p>
          The service is provided as-is. To the maximum extent permitted by law, SpecInspect LLC is
          not liable for damages arising from use of the service, including reliance on product
          data, beyond the amount you paid in the prior twelve months.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms; material changes will be announced by email or in the app.
          Continued use after changes take effect constitutes acceptance.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions: <a href="mailto:legal@specinspect.com" className="text-orange hover:underline">legal@specinspect.com</a>.
        </p>
      </section>
    </StaticPage>
  );
}
