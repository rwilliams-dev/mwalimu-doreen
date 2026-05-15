import Link from "next/link";
import { BookOpen, Star, Globe, Users, ChevronRight, Play } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Lessons",
    desc: "From greetings to grammar — 12 progressive modules with audio, video, and reading exercises.",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Star,
    title: "Spaced Repetition Flashcards",
    desc: "Master vocabulary with a proven memory system. Review the right words at the right time.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Globe,
    title: "Kenyan History & Culture",
    desc: "Language lives in culture. Explore Kenya's history, traditions, and heritage alongside every lesson.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Users,
    title: "Quizzes & Homework",
    desc: "Reinforce what you learn with interactive quizzes and assignments curated by Mwalimu Doreen.",
    color: "bg-orange-100 text-orange-700",
  },
];

const modules = [
  { num: 1, title: "Salamu na Utambulisho", english: "Greetings & Introductions" },
  { num: 2, title: "Familia na Marafiki", english: "Family & Friends" },
  { num: 3, title: "Nambari na Rangi", english: "Numbers & Colors" },
  { num: 4, title: "Chakula na Vinywaji", english: "Food & Drinks" },
  { num: 5, title: "Mwili na Afya", english: "The Body & Health" },
  { num: 6, title: "Safari na Miji", english: "Travel & Cities" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="fade-in-up fade-in-up-1 inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
              Karibu! · Welcome!
            </span>
            <h1 className="fade-in-up fade-in-up-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Learn Swahili with{" "}
              <span className="text-[var(--accent)] whitespace-nowrap">Mwalimu Doreen</span>
            </h1>
            <p className="fade-in-up fade-in-up-3 text-white/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              An in-depth, culturally rich Swahili course. Master the language of over{" "}
              <strong className="text-white">200 million people</strong> — from
              first words to fluent conversation, rooted in Kenyan history and heart.
            </p>
            <div className="fade-in-up fade-in-up-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/courses"
                className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
              >
                Start Learning <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/history"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/30"
              >
                <Play className="w-5 h-5" /> Explore Kenya
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-xs">
            {[
              { value: "12", label: "Course Modules" },
              { value: "500+", label: "Vocabulary Words" },
              { value: "40+", label: "Quizzes" },
              { value: "42+", label: "Kenyan Tribes" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 rounded-2xl p-5 text-center border border-white/20"
              >
                <div className="text-3xl font-extrabold text-[var(--accent)]">{s.value}</div>
                <div className="text-white/70 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to speak Swahili
            </h2>
            <p className="text-[var(--foreground)]/60 max-w-2xl mx-auto">
              Mwalimu Doreen has crafted a complete learning experience — language, culture,
              and community in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-[var(--border)]"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-[var(--foreground)]/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Course Modules</h2>
              <p className="text-[var(--foreground)]/60">
                12 progressive modules — start anywhere, go at your own pace.
              </p>
            </div>
            <Link
              href="/courses"
              className="flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              View all modules <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m) => (
              <Link
                key={m.num}
                href={`/courses/${m.num}`}
                className="group flex items-center gap-4 bg-[var(--muted)] rounded-2xl p-5 card-hover border border-[var(--border)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:bg-[var(--primary-dark)] transition-colors">
                  {m.num}
                </div>
                <div>
                  <div className="font-bold text-sm">{m.title}</div>
                  <div className="text-[var(--foreground)]/50 text-xs mt-0.5">{m.english}</div>
                </div>
                <ChevronRight className="w-4 h-4 ml-auto text-[var(--foreground)]/30 group-hover:text-[var(--primary)] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proverb CTA */}
      <section className="py-20 bg-[var(--secondary)] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote className="text-3xl sm:text-4xl font-bold italic mb-4 leading-snug">
            &ldquo;Lugha ni daraja kati ya watu.&rdquo;
          </blockquote>
          <p className="text-white/70 mb-2">Language is a bridge between people.</p>
          <p className="text-white/50 text-sm mb-10">— Swahili proverb</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-white text-[var(--secondary-dark)] font-bold px-8 py-4 rounded-full text-lg hover:bg-white/90 transition-colors shadow-lg"
          >
            Begin Your Journey <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
