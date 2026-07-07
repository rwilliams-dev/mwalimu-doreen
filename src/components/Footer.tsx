import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <BookOpen className="w-5 h-5 text-[var(--accent)]" />
              <span>Mwalimu <span className="text-[var(--accent)]">Doreen</span></span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              An in-depth Swahili language course rooted in Kenyan culture and history.
              <em className="block mt-1 text-[var(--accent)]">"Elimu ni ufunguo wa maisha."</em>
              <span className="text-white/50 text-xs">Education is the key to life.</span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-3 text-[var(--accent)]">Learn</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                ["Courses", "/courses"],
                ["Flashcards", "/flashcards"],
                ["Quizzes", "/quizzes"],
                ["Kenya & Culture", "/history"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 text-[var(--accent)]">About</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Built with love for Mwalimu Doreen — teacher, guide, and inspiration.
              Karibu sana! (Welcome!)
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-[var(--accent)]">Legal</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <span>© {new Date().getFullYear()} Mwalimu Doreen. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Doreen
          </span>
        </div>
      </div>
    </footer>
  );
}
