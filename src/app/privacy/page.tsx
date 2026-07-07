import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mwalimu Doreen",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
      <p className="text-[var(--foreground)]/50 mb-12">
        Mwalimu Doreen — Last updated: July 7, 2026
      </p>

      <div className="flex flex-col gap-8 text-[var(--foreground)]/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Who We Are</h2>
          <p>
            Mwalimu Doreen (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is an online Swahili
            language course platform. This policy explains what information we collect
            through this website and how it is used.
          </p>
          <p className="mt-2">
            Contact:{" "}
            <a href="mailto:richard@rwilliamsdev.com" className="text-[var(--primary)] font-semibold hover:underline">
              richard@rwilliamsdev.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Account information — name, email address, and password (via Supabase Auth)</li>
            <li>Course activity — progress, quiz and flashcard results, module completion</li>
            <li>Booking data — date, time, and any notes you provide when scheduling a live lesson</li>
            <li>Messages you exchange with Mwalimu Doreen through the platform&apos;s messaging feature</li>
            <li>Subscription and billing information, processed by Stripe</li>
          </ul>
          <p className="mt-2">
            We do not directly collect or store your payment card details — Stripe
            handles all payment processing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. How We Use Information</h2>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Providing access to courses, flashcards, and quizzes</li>
            <li>Scheduling and managing live lessons with Mwalimu Doreen</li>
            <li>Processing and managing your subscription</li>
            <li>Enabling messaging between you and Mwalimu Doreen</li>
            <li>Improving course content and the platform experience</li>
          </ul>
          <p className="mt-2">We do not sell or rent your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Data Storage &amp; Security</h2>
          <p>
            Account and course data is stored in Supabase (PostgreSQL) with Row Level
            Security enabled, so your data is only accessible to you and, where
            necessary, Mwalimu Doreen. All traffic is encrypted via HTTPS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Third-Party Services</h2>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li><strong>Supabase</strong> — account authentication and data storage</li>
            <li><strong>Stripe</strong> — subscription billing and payment processing</li>
            <li>A third-party video conferencing tool for live lessons, selected by Mwalimu Doreen</li>
          </ul>
          <p className="mt-2">These providers have their own privacy policies governing data they process on our behalf.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
          <p>
            You may access, correct, or request deletion of your personal data, or
            cancel your subscription at any time from your account. For any of these
            requests, contact{" "}
            <a href="mailto:richard@rwilliamsdev.com" className="text-[var(--primary)] font-semibold hover:underline">
              richard@rwilliamsdev.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Data Retention</h2>
          <p>
            We retain your account and course data for as long as your account is
            active. If you delete your account, we remove your personal data within a
            reasonable period, except where retention is required by law or by our
            payment processor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. Children&apos;s Privacy</h2>
          <p>
            This platform is intended for users aged 13 and older. We do not knowingly
            collect personal information from children under 13. If a learner under 13
            wishes to use the platform, a parent or guardian should create and manage
            the account on their behalf.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">9. Changes to This Policy</h2>
          <p>We may update this policy periodically. The &quot;Last updated&quot; date reflects the most recent revision.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">10. Governing Jurisdiction</h2>
          <p>
            This policy is governed by the laws of California, USA, and additionally
            by the Kenya Data Protection Act (2019) where applicable to learners and
            services connected to Kenya.
          </p>
        </section>
      </div>
    </div>
  );
}
