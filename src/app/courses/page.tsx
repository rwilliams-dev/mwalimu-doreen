import Link from "next/link";
import { ChevronRight, Clock, BookOpen, CheckCircle2, Lock } from "lucide-react";
import clsx from "clsx";

const modules = [
  {
    num: 1,
    title: "Salamu na Utambulisho",
    english: "Greetings & Introductions",
    desc: "Learn how to say hello, introduce yourself, and start conversations in Swahili.",
    lessons: 6,
    duration: "45 min",
    unlocked: true,
    completed: true,
  },
  {
    num: 2,
    title: "Familia na Marafiki",
    english: "Family & Friends",
    desc: "Vocabulary for family members, relationships, and talking about the people in your life.",
    lessons: 7,
    duration: "55 min",
    unlocked: true,
    completed: false,
  },
  {
    num: 3,
    title: "Nambari na Rangi",
    english: "Numbers & Colors",
    desc: "Count, tell time, give your age, and describe the world around you with colors.",
    lessons: 5,
    duration: "40 min",
    unlocked: true,
    completed: false,
  },
  {
    num: 4,
    title: "Chakula na Vinywaji",
    english: "Food & Drinks",
    desc: "Order at a restaurant, shop at the market, and talk about Kenyan cuisine.",
    lessons: 8,
    duration: "60 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 5,
    title: "Mwili na Afya",
    english: "The Body & Health",
    desc: "Describe physical ailments, visit a doctor, and talk about your body in Swahili.",
    lessons: 6,
    duration: "50 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 6,
    title: "Safari na Miji",
    english: "Travel & Cities",
    desc: "Navigate Nairobi and other Kenyan cities — directions, transport, and landmarks.",
    lessons: 7,
    duration: "55 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 7,
    title: "Kazi na Biashara",
    english: "Work & Business",
    desc: "Professional Swahili: job titles, workplace phrases, and formal communication.",
    lessons: 6,
    duration: "50 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 8,
    title: "Nyumbani na Maisha ya Kila Siku",
    english: "Home & Daily Life",
    desc: "Talk about your home, daily routines, chores, and household items.",
    lessons: 7,
    duration: "55 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 9,
    title: "Hali ya Hewa na Mazingira",
    english: "Weather & Environment",
    desc: "Describe seasons, weather patterns, and Kenya's stunning natural landscapes.",
    lessons: 5,
    duration: "40 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 10,
    title: "Sarufi ya Kina",
    english: "Deep Grammar",
    desc: "Swahili noun classes, verb tenses, and complex sentence structures explained clearly.",
    lessons: 10,
    duration: "90 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 11,
    title: "Utamaduni na Desturi",
    english: "Culture & Traditions",
    desc: "Proverbs, poetry, ceremonies, and the cultural fabric woven into the Swahili language.",
    lessons: 8,
    duration: "65 min",
    unlocked: false,
    completed: false,
  },
  {
    num: 12,
    title: "Mazungumzo ya Ufasiri",
    english: "Fluent Conversation",
    desc: "Advanced dialogues, idioms, storytelling, and real-world conversation practice.",
    lessons: 9,
    duration: "75 min",
    unlocked: false,
    completed: false,
  },
];

export default function CoursesPage() {
  const completed = modules.filter((m) => m.completed).length;
  const progress = Math.round((completed / modules.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Swahili Course</h1>
        <p className="text-[var(--foreground)]/60 mb-6">
          12 modules · self-paced · designed by Mwalimu Doreen
        </p>
        {/* Progress bar */}
        <div className="bg-[var(--border)] rounded-full h-3 w-full max-w-md">
          <div
            className="bg-[var(--secondary)] h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--foreground)]/50 mt-2">
          {completed} of {modules.length} modules completed ({progress}%)
        </p>
      </div>

      {/* Module list */}
      <div className="flex flex-col gap-4">
        {modules.map((m) => (
          <div
            key={m.num}
            className={clsx(
              "rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
              m.unlocked
                ? "bg-white border-[var(--border)] card-hover"
                : "bg-[var(--muted)] border-[var(--border)] opacity-70"
            )}
          >
            {/* Number badge */}
            <div
              className={clsx(
                "w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-xl flex-shrink-0",
                m.completed
                  ? "bg-[var(--secondary)] text-white"
                  : m.unlocked
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--border)] text-[var(--foreground)]/40"
              )}
            >
              {m.completed ? <CheckCircle2 className="w-7 h-7" /> : m.num}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg leading-tight">{m.title}</h3>
                <span className="text-xs bg-[var(--muted)] text-[var(--foreground)]/50 px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {m.english}
                </span>
              </div>
              <p className="text-[var(--foreground)]/60 text-sm mt-1 leading-relaxed">{m.desc}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[var(--foreground)]/40">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {m.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {m.duration}
                </span>
              </div>
            </div>

            {/* Action */}
            {m.unlocked ? (
              <Link
                href={`/courses/${m.num}`}
                className="flex-shrink-0 flex items-center gap-1 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                {m.completed ? "Review" : "Start"} <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex-shrink-0 flex items-center gap-1 text-[var(--foreground)]/30 text-sm">
                <Lock className="w-4 h-4" /> Locked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
