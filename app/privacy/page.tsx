import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="June 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          SpecInspect LLC (&ldquo;SpecInspect,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates a construction specification
          intelligence platform at specinspect.com. This Privacy Policy explains how we collect, use, and protect
          information from users of our web app, iOS app, and API. By creating an account or using the service,
          you agree to this policy.
        </p>
      </section>

      <section>
        <h2>2. Data We Collect</h2>
        <ul>
          <li><strong>Account information:</strong> Your email address, name, and password (stored as a bcrypt hash — we never store your plaintext password) when you register.</li>
          <li><strong>Usage data:</strong> Search queries, pages visited, products saved to projects, and feature usage — used to improve the service and product database.</li>
          <li><strong>Payment method type:</strong> Stripe processes all card transactions. We receive a payment method type (e.g., &ldquo;Visa ending in 4242&rdquo;) and subscription status — your card number never touches our servers.</li>
          <li><strong>Device and browser info:</strong> IP address, browser type, and operating system, collected via server logs for security and debugging purposes.</li>
          <li><strong>Location:</strong> If you use the weather / apply-check feature, your ZIP code or GPS coordinates are sent to retrieve weather data. We do not store precise location beyond the duration of the request.</li>
        </ul>
      </section>

      <section>
        <h2>3. Cookies</h2>
        <p>
          We use a single session cookie named <code>si_token</code> to keep you authenticated. It is:
        </p>
        <ul>
          <li><strong>HttpOnly</strong> — cannot be accessed by JavaScript running in your browser.</li>
          <li><strong>Secure</strong> — transmitted only over HTTPS in production.</li>
          <li><strong>SameSite: Lax</strong> — protects against cross-site request forgery.</li>
          <li><strong>Expires on logout</strong> — or after 30 days of inactivity.</li>
        </ul>
        <p>
          We do not use tracking cookies, advertising cookies, or third-party analytics cookies.
          Local preferences (recent searches, compare tray) are stored in your browser&apos;s localStorage
          and never leave your device.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <ul>
          <li>
            <strong>Stripe</strong> — payment processing for Pro subscriptions.
            Stripe&apos;s privacy policy is available at{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">stripe.com/privacy</a>.
          </li>
          <li>
            <strong>Cloudflare</strong> — CDN and DDoS protection. Traffic routes through Cloudflare&apos;s network.
            See their privacy policy at cloudflare.com/privacypolicy.
          </li>
        </ul>
        <p>We do not sell your data to or share it with any other third parties for marketing purposes.</p>
      </section>

      <section>
        <h2>5. How We Use Your Data</h2>
        <ul>
          <li>Account authentication and security.</li>
          <li>Delivering and improving the product search, compare, and submittal features.</li>
          <li>Improving product database accuracy and coverage based on aggregate usage patterns.</li>
          <li>Sending transactional emails: password resets, subscription receipts, and important account notices. We do not send marketing emails without your explicit opt-in.</li>
        </ul>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p>
          Account data (name, email, projects, saved specs) is retained while your account is active.
          Server logs are retained for 90 days. If you delete your account, your personal data and projects
          are deleted within 30 days. Anonymized, aggregated usage statistics may be retained indefinitely.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <ul>
          <li><strong>Access:</strong> View your account information on the Account page.</li>
          <li><strong>Deletion:</strong> Delete your account in Account settings — this removes your data within 30 days.</li>
          <li><strong>Correction:</strong> Contact <a href="mailto:privacy@specinspect.com" className="text-gold hover:underline">privacy@specinspect.com</a> to correct any inaccurate data.</li>
          <li><strong>Portability:</strong> Contact us to request an export of your account data.</li>
        </ul>
      </section>

      <section>
        <h2>8. Children</h2>
        <p>
          SpecInspect is not directed at users under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>
      </section>

      <section>
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. For material changes, we will notify you by
          email and/or by posting a prominent notice on the site at least 14 days before the change takes effect.
          Continued use of the service after that date constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          Questions or requests regarding this policy:{' '}
          <a href="mailto:privacy@specinspect.com" className="text-gold hover:underline">privacy@specinspect.com</a>
        </p>
      </section>
    </StaticPage>
  );
}
