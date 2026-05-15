import Link from "next/link";
import { ChevronLeft, PlayCircle, FileText, Headphones, ChevronRight } from "lucide-react";

const moduleData: Record<
  string,
  {
    title: string;
    english: string;
    intro: string;
    vocabulary: { swahili: string; english: string; example: string }[];
    lessons: { type: "video" | "reading" | "audio"; title: string; duration: string }[];
  }
> = {
  "1": {
    title: "Salamu na Utambulisho",
    english: "Greetings & Introductions",
    intro:
      "In Swahili culture, greetings are central to social life. It is impolite to rush past someone without a proper greeting. This module teaches you the essential phrases for saying hello, goodbye, and introducing yourself — the very foundation of the language.",
    vocabulary: [
      { swahili: "Habari", english: "News / How are you?", example: "Habari yako? — How are you?" },
      { swahili: "Nzuri", english: "Good / Fine", example: "Nzuri sana — Very good" },
      { swahili: "Jina langu ni...", english: "My name is...", example: "Jina langu ni Doreen." },
      { swahili: "Karibu", english: "Welcome / You are welcome", example: "Karibu Kenya!" },
      { swahili: "Asante", english: "Thank you", example: "Asante sana — Thank you very much." },
      { swahili: "Kwaheri", english: "Goodbye", example: "Kwaheri, tutaonana! — Goodbye, we'll see each other!" },
    ],
    lessons: [
      { type: "video", title: "Introduction: The Art of Swahili Greetings", duration: "8 min" },
      { type: "reading", title: "Written Dialogue: Meeting Someone New", duration: "5 min" },
      { type: "audio", title: "Listen & Repeat: Pronunciation Practice", duration: "7 min" },
      { type: "video", title: "Formal vs. Informal Greetings", duration: "9 min" },
      { type: "reading", title: "Cultural Note: Why Greetings Matter in Kenya", duration: "4 min" },
      { type: "audio", title: "Full Conversation: First Meeting", duration: "6 min" },
    ],
  },
  "2": {
    title: "Familia na Marafiki",
    english: "Family & Friends",
    intro:
      "Family is the cornerstone of Kenyan society. This module equips you with the vocabulary to describe your family, talk about relationships, and connect with people on a personal level.",
    vocabulary: [
      { swahili: "Familia", english: "Family", example: "Familia yangu ni kubwa. — My family is big." },
      { swahili: "Mama", english: "Mother", example: "Mama yangu anafanya kazi. — My mother works." },
      { swahili: "Baba", english: "Father", example: "Baba yangu ni mwalimu. — My father is a teacher." },
      { swahili: "Kaka", english: "Brother", example: "Nina kaka mmoja. — I have one brother." },
      { swahili: "Dada", english: "Sister", example: "Dada yangu ana miaka kumi. — My sister is ten years old." },
      { swahili: "Rafiki", english: "Friend", example: "Yeye ni rafiki yangu bora. — He/She is my best friend." },
    ],
    lessons: [
      { type: "video", title: "Family Members in Swahili", duration: "10 min" },
      { type: "reading", title: "A Kenyan Family: Reading Passage", duration: "6 min" },
      { type: "audio", title: "Pronunciation: Family Vocabulary", duration: "5 min" },
      { type: "video", title: "Talking About Relationships", duration: "8 min" },
      { type: "reading", title: "Dialogue: Introducing Your Family", duration: "5 min" },
      { type: "audio", title: "Listening Exercise: Family Descriptions", duration: "7 min" },
      { type: "video", title: "Extended Family & Community", duration: "9 min" },
    ],
  },
};

const iconMap = {
  video: PlayCircle,
  reading: FileText,
  audio: Headphones,
};

const colorMap = {
  video: "bg-red-100 text-red-700",
  reading: "bg-blue-100 text-blue-700",
  audio: "bg-purple-100 text-purple-700",
};

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mod = moduleData[id];

  if (!mod) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link href="/courses" className="text-[var(--primary)] hover:underline">
          ← Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-1 text-[var(--foreground)]/50 hover:text-[var(--primary)] text-sm mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Courses
      </Link>

      {/* Module header */}
      <div className="bg-[var(--primary)] text-white rounded-3xl p-8 mb-10">
        <div className="text-white/60 text-sm mb-1">Module {id}</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">{mod.title}</h1>
        <p className="text-white/70 text-lg">{mod.english}</p>
      </div>

      {/* Intro */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Overview</h2>
        <p className="text-[var(--foreground)]/70 leading-relaxed">{mod.intro}</p>
      </div>

      {/* Vocabulary */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Key Vocabulary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mod.vocabulary.map((v) => (
            <div
              key={v.swahili}
              className="bg-[var(--muted)] border border-[var(--border)] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[var(--primary)] text-lg">{v.swahili}</span>
                <span className="text-sm text-[var(--foreground)]/60">{v.english}</span>
              </div>
              <p className="text-xs text-[var(--foreground)]/50 italic">{v.example}</p>
            </div>
          ))}
        </div>
        <Link
          href="/flashcards"
          className="inline-flex items-center gap-1 mt-4 text-sm text-[var(--secondary)] font-semibold hover:underline"
        >
          Practice with Flashcards <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Lessons */}
      <div>
        <h2 className="text-xl font-bold mb-4">Lessons</h2>
        <div className="flex flex-col gap-3">
          {mod.lessons.map((lesson, i) => {
            const Icon = iconMap[lesson.type];
            return (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[lesson.type]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{lesson.title}</div>
                  <div className="text-xs text-[var(--foreground)]/40 mt-0.5">{lesson.duration}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--foreground)]/30" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Next module */}
      <div className="mt-12 flex justify-end">
        <Link
          href={`/courses/${parseInt(id) + 1}`}
          className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Next Module <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
