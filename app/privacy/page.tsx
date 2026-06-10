import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="June 10, 2026">
      <section>
        <h2>What we collect</h2>
        <p>
          SpecInspect collects the information you give us when you create an account (name, email,
          password), the projects and product specs you save, and basic usage data such as search
          queries and pages visited. If you use the site weather feature, your device shares
          location coordinates with us only when you allow it, and only to retrieve a forecast.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To operate your account, projects, and submittal packages.</li>
          <li>To improve search relevance and product data quality.</li>
          <li>To send service emails such as password resets and important account notices.</li>
        </ul>
        <p>We do not sell your personal information, and we do not share it with advertisers.</p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>
          We use a single authentication cookie to keep you signed in. It is httpOnly, which means
          it cannot be read by scripts running in your browser. Preferences such as theme and
          recent searches are stored locally on your device and never leave it.
        </p>
      </section>
      <section>
        <h2>Data retention and deletion</h2>
        <p>
          Your account data is retained while your account is active. To delete your account and
          associated data, email <a href="mailto:privacy@specinspect.com" className="text-orange hover:underline">privacy@specinspect.com</a> and
          we will process the request within 30 days.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href="mailto:privacy@specinspect.com" className="text-orange hover:underline">privacy@specinspect.com</a>.
        </p>
      </section>
    </StaticPage>
  );
}
