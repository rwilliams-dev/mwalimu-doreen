import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Mwalimu Doreen",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
      <p className="text-[var(--foreground)]/50 mb-12">
        Mwalimu Doreen — Last updated: July 7, 2026
      </p>

      <div className="flex flex-col gap-8 text-[var(--foreground)]/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Agreement</h2>
          <p>
            By creating an account or subscribing to Mwalimu Doreen, you agree to
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
          <p>
            Mwalimu Doreen is an online Swahili language course platform. Module 1 is
            free for everyone. A paid subscription unlocks all course modules,
            flashcards, quizzes, Kenyan history &amp; culture content, live one-on-one
            lessons with Mwalimu Doreen, and direct messaging with her.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. Accounts</h2>
          <p>
            You must provide accurate information when creating an account and are
            responsible for keeping your login credentials secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Subscription &amp; Billing</h2>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Full access is billed at $19.99/month via Stripe.</li>
            <li>You may cancel anytime through your account&apos;s billing portal.</li>
            <li>Cancellation takes effect at the end of your current billing period — you keep access until then.</li>
            <li>We do not provide refunds for partial billing periods.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Live Lessons &amp; Booking</h2>
          <p>
            Booking a lesson reserves that time slot with Mwalimu Doreen. Please give
            at least 24 hours&apos; notice if you need to reschedule. Lessons missed
            without notice may not be rescheduled or refunded.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Course Content &amp; Intellectual Property</h2>
          <p>
            All course materials, videos, flashcards, and quizzes are the property of
            Mwalimu Doreen. Your subscription grants you a personal, non-transferable
            license to use this content for your own learning — you may not
            redistribute, resell, or publicly share course materials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Messaging</h2>
          <p>
            The messaging feature is intended for lesson-related communication with
            Mwalimu Doreen. It is not monitored in real time and should not be used
            for urgent or emergency communication.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. Free Tier</h2>
          <p>
            Module 1 and other free content are provided at no cost but are not
            guaranteed indefinitely and may change over time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">9. Third-Party Services</h2>
          <p>
            This platform relies on Stripe for payment processing, Supabase for
            account and data storage, and a third-party video conferencing tool for
            live lessons. We are not responsible for outages or policy changes made by
            these providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">10. Limitation of Liability</h2>
          <p>
            The service is provided &quot;as is.&quot; We are not liable for indirect,
            incidental, or consequential damages arising from your use of the
            platform, beyond the amount you&apos;ve paid in the preceding 3 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">11. Termination</h2>
          <p>
            We may suspend or terminate accounts that violate these terms. You may
            cancel your account or subscription at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">12. Governing Law</h2>
          <p>
            These terms are governed by the laws of California, USA, and additionally
            by applicable Kenyan law for learners and services connected to Kenya.
          </p>
        </section>
      </div>
    </div>
  );
}
