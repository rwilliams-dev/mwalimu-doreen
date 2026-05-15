"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/history", label: "Kenya & Culture" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[var(--primary)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <BookOpen className="w-6 h-6 text-[var(--accent)]" />
            <span>Mwalimu <span className="text-[var(--accent)]">Doreen</span></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href
                    ? "bg-white/20 text-[var(--accent)]"
                    : "hover:bg-white/10"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="ml-3 px-4 py-2 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-dark)] transition-colors"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--primary-dark)] px-4 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "px-3 py-2 rounded-md text-sm font-medium",
                pathname === l.href ? "bg-white/20 text-[var(--accent)]" : "hover:bg-white/10"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
