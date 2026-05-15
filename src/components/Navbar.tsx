"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, LogOut, Calendar, MessageCircle } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/history", label: "Kenya & Culture" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-[var(--primary)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <BookOpen className="w-6 h-6 text-[var(--accent)]" />
            <span className="whitespace-nowrap">Mwalimu <span className="text-[var(--accent)]">Doreen</span></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href ? "bg-white/20 text-[var(--accent)]" : "hover:bg-white/10"
                )}
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-2 ml-3">
                <Link href="/book" className={clsx("p-2 rounded-md hover:bg-white/10 transition-colors", pathname === "/book" && "bg-white/20")}>
                  <Calendar className="w-5 h-5" />
                </Link>
                <Link href="/messages" className={clsx("p-2 rounded-md hover:bg-white/10 transition-colors", pathname === "/messages" && "bg-white/20")}>
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <Link href="/dashboard" className="px-4 py-2 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-dark)] transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-md hover:bg-white/10 transition-colors" title="Log out">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-semibold hover:bg-white/10 rounded-full transition-colors">
                  Log In
                </Link>
                <Link href="/pricing" className="px-4 py-2 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-dark)] transition-colors">
                  Subscribe — $19.99/mo
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-md hover:bg-white/10" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--primary-dark)] px-4 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={clsx("px-3 py-2 rounded-md text-sm font-medium", pathname === l.href ? "bg-white/20 text-[var(--accent)]" : "hover:bg-white/10")}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/book" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-white/10">📅 Book a Lesson</Link>
              <Link href="/messages" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-white/10">💬 Messages</Link>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-white/10">Dashboard</Link>
              <button onClick={handleLogout} className="text-left px-3 py-2 rounded-md text-sm hover:bg-white/10">Log Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-white/10">Log In</Link>
              <Link href="/pricing" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm bg-[var(--accent)] text-white mt-1 rounded-xl text-center font-semibold">Subscribe — $19.99/mo</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
