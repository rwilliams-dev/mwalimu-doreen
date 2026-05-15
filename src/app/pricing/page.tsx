"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, BookOpen, Video, MessageCircle, Star } from "lucide-react";

const included = [
  { icon: BookOpen, text: "All 12 Swahili course modules (Modules 2–12)" },
  { icon: Star, text: "500+ vocabulary flashcards with spaced repetition" },
  { icon: CheckCircle2, text: "40+ quizzes and graded homework assignments" },
  { icon: BookOpen, text: "Kenyan history & culture deep-dives" },
  { icon: Video, text: "Book one-on-one live lessons with Mwalimu Doreen" },
  { icon: MessageCircle, text: "Direct messaging with Mwalimu Doreen" },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else if (res.status === 401) {
      router.push("/auth/login?next=/pricing");
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <span className="inline-block bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Full Access
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          One plan. Everything included.
        </h1>
        <p className="text-[var(--foreground)]/60 max-w-xl mx-auto">
          Module 1 is always free. Subscribe for full access to all courses, live lessons, and direct support from Mwalimu Doreen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Free tier */}
        <div className="bg-white border-2 border-[var(--border)] rounded-3xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Free</h2>
            <p className="text-[var(--foreground)]/50 text-sm">Get started with no commitment</p>
          </div>
          <div className="text-4xl font-extrabold mb-6">$0</div>
          <ul className="space-y-3 mb-8">
            {[
              "Module 1: Greetings & Introductions",
              "Basic flashcard decks",
              "3 starter quizzes",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push("/auth/signup")}
            className="w-full border-2 border-[var(--border)] text-[var(--foreground)] font-semibold py-3 rounded-xl hover:border-[var(--primary)] transition-colors"
          >
            Start Free
          </button>
        </div>

        {/* Paid tier */}
        <div className="bg-[var(--primary)] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Full Access</h2>
            <p className="text-white/60 text-sm">Everything Mwalimu Doreen offers</p>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-5xl font-extrabold">$19.99</span>
            <span className="text-white/60 mb-1">/month</span>
          </div>
          <p className="text-white/50 text-xs mb-6">Cancel anytime</p>
          <ul className="space-y-3 mb-8">
            {included.map((f) => (
              <li key={f.text} className="flex items-start gap-2 text-sm">
                <f.icon className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                {f.text}
              </li>
            ))}
          </ul>
          {error && <p className="text-red-300 text-sm mb-3 bg-white/10 rounded-xl px-3 py-2">{error}</p>}
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-[var(--primary)] font-bold py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-60 text-lg"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Redirecting..." : "Subscribe Now"}
          </button>
          <p className="text-white/40 text-xs text-center mt-3">Secure payment via Stripe</p>
        </div>
      </div>
    </div>
  );
}
