"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import clsx from "clsx";

const quizzes = [
  {
    id: 1,
    title: "Greetings & Introductions",
    module: "Module 1",
    questions: [
      {
        q: "What does 'Habari' mean?",
        options: ["Goodbye", "Thank you", "How are you / News", "Welcome"],
        answer: 2,
      },
      {
        q: "How do you say 'My name is...' in Swahili?",
        options: ["Ninaitwa...", "Jina langu ni...", "Mimi ni...", "Both A and B"],
        answer: 3,
      },
      {
        q: "What is the correct response to 'Habari yako?'",
        options: ["Kwaheri", "Asante", "Nzuri", "Karibu"],
        answer: 2,
      },
      {
        q: "What does 'Karibu' mean?",
        options: ["See you later", "Welcome / You're welcome", "Good morning", "Please"],
        answer: 1,
      },
      {
        q: "How do you say 'Goodbye' in Swahili?",
        options: ["Habari", "Asante", "Nzuri", "Kwaheri"],
        answer: 3,
      },
    ],
  },
  {
    id: 2,
    title: "Family Vocabulary",
    module: "Module 2",
    questions: [
      {
        q: "What does 'Mama' mean?",
        options: ["Sister", "Grandmother", "Mother", "Aunt"],
        answer: 2,
      },
      {
        q: "What is the Swahili word for 'Brother'?",
        options: ["Dada", "Kaka", "Rafiki", "Baba"],
        answer: 1,
      },
      {
        q: "How do you say 'My family is big' in Swahili?",
        options: [
          "Familia yangu ni kubwa",
          "Familia yangu ni ndogo",
          "Familia ni nzuri",
          "Nina familia",
        ],
        answer: 0,
      },
      {
        q: "What does 'Rafiki' mean?",
        options: ["Family", "Brother", "Friend", "Father"],
        answer: 2,
      },
      {
        q: "Which means 'Sister'?",
        options: ["Kaka", "Shangazi", "Dada", "Bibi"],
        answer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Numbers & Colors",
    module: "Module 3",
    questions: [
      {
        q: "What does 'Moja' mean?",
        options: ["Two", "One", "Three", "Ten"],
        answer: 1,
      },
      {
        q: "How do you say 'Five' in Swahili?",
        options: ["Nne", "Tatu", "Tano", "Sita"],
        answer: 2,
      },
      {
        q: "What is the Swahili word for 'Red'?",
        options: ["Kijani", "Bluu", "Nyekundu", "Njano"],
        answer: 2,
      },
      {
        q: "What does 'Kumi' mean?",
        options: ["Five", "Eight", "Ten", "Twelve"],
        answer: 2,
      },
      {
        q: "Which color is 'Kijani'?",
        options: ["Blue", "Yellow", "White", "Green"],
        answer: 3,
      },
    ],
  },
];

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);

  const quiz = activeQuiz !== null ? quizzes[activeQuiz] : null;
  const question = quiz?.questions[current];

  function startQuiz(i: number) {
    setActiveQuiz(i);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  }

  function handleSelect(i: number) {
    if (selected !== null) return;
    setSelected(i);
  }

  function handleNext() {
    const newAnswers = [...answers, selected];
    if (current + 1 >= (quiz?.questions.length ?? 0)) {
      setAnswers(newAnswers);
      setShowResult(true);
    } else {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function resetQuiz() {
    setActiveQuiz(null);
    setShowResult(false);
  }

  const score =
    quiz && showResult
      ? answers.filter((a, i) => a === quiz.questions[i].answer).length
      : 0;

  if (quiz && showResult) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
        <h2 className="text-3xl font-extrabold mb-2">Quiz Complete!</h2>
        <p className="text-[var(--foreground)]/60 mb-1">{quiz.title}</p>
        <div className="text-5xl font-extrabold text-[var(--primary)] my-6">
          {score}/{quiz.questions.length}
        </div>
        <p className="text-[var(--foreground)]/60 mb-8">
          {pct >= 80
            ? "Excellent! You have a strong grasp of this material."
            : pct >= 60
            ? "Good effort! Review the flashcards and try again."
            : "Keep practicing! Swahili takes time — you've got this."}
        </p>

        {/* Review answers */}
        <div className="text-left mb-8 space-y-4">
          {quiz.questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div
                key={i}
                className={clsx(
                  "rounded-2xl p-4 border",
                  correct
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                )}
              >
                <div className="flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">{q.q}</p>
                    {!correct && (
                      <p className="text-xs text-green-700 mt-1">
                        Correct: {q.options[q.answer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary-dark)] transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Back to Quizzes
        </button>
      </div>
    );
  }

  if (quiz && !showResult) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[var(--foreground)]/50 mb-2">
            <span>{quiz.title}</span>
            <span>
              {current + 1} / {quiz.questions.length}
            </span>
          </div>
          <div className="bg-[var(--border)] rounded-full h-2">
            <div
              className="bg-[var(--primary)] h-2 rounded-full transition-all"
              style={{ width: `${((current) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-3xl p-8 mb-6">
          <p className="text-xl font-bold mb-8 text-center">{question?.q}</p>
          <div className="grid grid-cols-1 gap-3">
            {question?.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={clsx(
                  "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all text-sm",
                  selected === null
                    ? "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)]"
                    : i === question.answer
                    ? "border-green-500 bg-green-50 text-green-800"
                    : i === selected
                    ? "border-red-400 bg-red-50 text-red-800"
                    : "border-[var(--border)] opacity-50"
                )}
              >
                <span className="font-bold mr-3 text-[var(--foreground)]/40">
                  {["A", "B", "C", "D"][i]}.
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {selected !== null && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              {current + 1 >= quiz.questions.length ? "See Results" : "Next"}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Quizzes</h1>
      <p className="text-[var(--foreground)]/60 mb-10">
        Test your knowledge after each module. Each quiz has 5 questions.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map((q, i) => (
          <button
            key={q.id}
            onClick={() => startQuiz(i)}
            className="text-left bg-white border border-[var(--border)] rounded-2xl p-6 card-hover group"
          >
            <div className="text-xs text-[var(--foreground)]/40 mb-1">{q.module}</div>
            <h3 className="font-bold text-lg mb-3">{q.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground)]/50">
                {q.questions.length} questions
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-[var(--primary)] group-hover:underline">
                Start <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
