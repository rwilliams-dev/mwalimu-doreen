import Link from "next/link";
import {
  BookOpen,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  ChevronRight,
  Award,
  BarChart2,
} from "lucide-react";

const stats = [
  { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-500 bg-orange-100" },
  { label: "Words Learned", value: "84", icon: Star, color: "text-yellow-600 bg-yellow-100" },
  { label: "Quizzes Done", value: "5", icon: CheckCircle2, color: "text-green-600 bg-green-100" },
  { label: "Hours Studied", value: "3.2", icon: Clock, color: "text-blue-600 bg-blue-100" },
];

const modules = [
  { num: 1, title: "Salamu na Utambulisho", progress: 100, status: "completed" },
  { num: 2, title: "Familia na Marafiki", progress: 40, status: "in_progress" },
  { num: 3, title: "Nambari na Rangi", progress: 0, status: "not_started" },
  { num: 4, title: "Chakula na Vinywaji", progress: 0, status: "locked" },
];

const recentActivity = [
  { label: "Completed Module 1: Salamu na Utambulisho", time: "Today", icon: CheckCircle2, color: "text-green-600" },
  { label: "Scored 4/5 on Greetings Quiz", time: "Yesterday", icon: Star, color: "text-yellow-600" },
  { label: "Reviewed 18 flashcards", time: "2 days ago", icon: BookOpen, color: "text-blue-600" },
  { label: "Started Module 2: Familia na Marafiki", time: "3 days ago", icon: BookOpen, color: "text-[var(--primary)]" },
];

const achievements = [
  { title: "First Step", desc: "Completed your first lesson", earned: true },
  { title: "Week Warrior", desc: "7-day study streak", earned: true },
  { title: "Vocabulary Builder", desc: "Learned 100 words", earned: false },
  { title: "Quiz Master", desc: "Score 100% on any quiz", earned: false },
];

export default function DashboardPage() {
  const overallProgress = Math.round(
    modules.reduce((acc, m) => acc + m.progress, 0) / (modules.length * 100) * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold mb-1">My Dashboard</h1>
          <p className="text-[var(--foreground)]/60">
            Karibu! Keep going — you are doing great.
          </p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[var(--primary-dark)] transition-colors"
        >
          Continue Learning <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-[var(--border)] rounded-2xl p-5 text-center"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold">{s.value}</div>
            <div className="text-xs text-[var(--foreground)]/50 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Overall progress */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="font-bold text-lg">Overall Progress</h2>
              <span className="ml-auto text-2xl font-extrabold text-[var(--primary)]">
                {overallProgress}%
              </span>
            </div>
            <div className="bg-[var(--border)] rounded-full h-3 mb-6">
              <div
                className="bg-[var(--primary)] h-3 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {modules.map((m) => (
                <div key={m.num}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {m.num}. {m.title}
                    </span>
                    <span
                      className={
                        m.status === "completed"
                          ? "text-green-600 font-semibold"
                          : m.status === "in_progress"
                          ? "text-[var(--accent)] font-semibold"
                          : "text-[var(--foreground)]/40"
                      }
                    >
                      {m.status === "completed"
                        ? "✓ Done"
                        : m.status === "in_progress"
                        ? `${m.progress}%`
                        : m.status === "locked"
                        ? "🔒 Locked"
                        : "Not started"}
                    </span>
                  </div>
                  <div className="bg-[var(--border)] rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        m.status === "completed" ? "bg-green-500" : "bg-[var(--accent)]"
                      }`}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <a.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${a.color}`} />
                  <div className="flex-1 text-sm">{a.label}</div>
                  <span className="text-xs text-[var(--foreground)]/40 flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Achievements */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="font-bold text-lg">Achievements</h2>
            </div>
            <div className="flex flex-col gap-3">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    a.earned ? "bg-yellow-50 border border-yellow-200" : "bg-[var(--muted)] opacity-60"
                  }`}
                >
                  <span className="text-xl">{a.earned ? "🏅" : "🔒"}</span>
                  <div>
                    <div className="font-semibold text-sm">{a.title}</div>
                    <div className="text-xs text-[var(--foreground)]/50">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-[var(--primary)] text-white rounded-2xl p-6">
            <h2 className="font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "Practice Flashcards", href: "/flashcards" },
                { label: "Take a Quiz", href: "/quizzes" },
                { label: "Kenya & Culture", href: "/history" },
                { label: "Resume Course", href: "/courses/2" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  {l.label} <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
