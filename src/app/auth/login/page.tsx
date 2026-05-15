"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium block mb-1">Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required placeholder="you@example.com"
          className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
        />
      </div>
      <div>
        <label className="text-sm font-medium block mb-1">Password</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          required placeholder="••••••••"
          className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
        />
      </div>
      {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>}
      <button
        type="submit" disabled={loading}
        className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold py-3 rounded-xl transition-colors mt-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--muted)] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-[var(--primary)]" />
            <span className="font-extrabold text-xl">Mwalimu <span className="text-[var(--accent)]">Doreen</span></span>
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-[var(--foreground)]/50 text-sm mt-1">Log in to continue your Swahili journey</p>
        </div>
        <Suspense fallback={<div className="h-48 animate-pulse bg-[var(--muted)] rounded-xl" />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-sm text-[var(--foreground)]/50 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[var(--primary)] font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
