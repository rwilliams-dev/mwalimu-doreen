"use client";

import { useState } from "react";
import { RotateCcw, ThumbsUp, ThumbsDown, Layers } from "lucide-react";
import clsx from "clsx";

const decks = [
  {
    id: "greetings",
    name: "Greetings & Introductions",
    cards: [
      { front: "Habari", back: "News / How are you?", example: "Habari yako? — How are you?" },
      { front: "Nzuri", back: "Good / Fine", example: "Nzuri sana — Very good" },
      { front: "Karibu", back: "Welcome", example: "Karibu Kenya!" },
      { front: "Asante", back: "Thank you", example: "Asante sana — Thank you very much" },
      { front: "Kwaheri", back: "Goodbye", example: "Kwaheri! — Goodbye!" },
      { front: "Jina langu ni", back: "My name is...", example: "Jina langu ni Doreen." },
    ],
  },
  {
    id: "family",
    name: "Family & Friends",
    cards: [
      { front: "Familia", back: "Family", example: "Familia yangu ni kubwa." },
      { front: "Mama", back: "Mother", example: "Mama yangu ni mpishi." },
      { front: "Baba", back: "Father", example: "Baba yangu ni daktari." },
      { front: "Kaka", back: "Brother", example: "Nina kaka mmoja." },
      { front: "Dada", back: "Sister", example: "Dada yangu ni mwanafunzi." },
      { front: "Rafiki", back: "Friend", example: "Yeye ni rafiki yangu bora." },
    ],
  },
  {
    id: "numbers",
    name: "Numbers & Colors",
    cards: [
      { front: "Moja", back: "One (1)", example: "Nina kitabu kimoja." },
      { front: "Mbili", back: "Two (2)", example: "Nina watoto wawili." },
      { front: "Tano", back: "Five (5)", example: "Toa shilingi tano." },
      { front: "Kumi", back: "Ten (10)", example: "Saa kumi za asubuhi." },
      { front: "Nyekundu", back: "Red", example: "Bendera ina rangi nyekundu." },
      { front: "Kijani", back: "Green", example: "Majani ni kijani." },
    ],
  },
];

export default function FlashcardsPage() {
  const [activeDeck, setActiveDeck] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [review, setReview] = useState<number[]>([]);

  const deck = decks[activeDeck];
  const card = deck.cards[cardIndex];
  const total = deck.cards.length;
  const done = cardIndex >= total;

  function next(result: "know" | "review") {
    if (result === "know") setKnown((k) => [...k, cardIndex]);
    else setReview((r) => [...r, cardIndex]);
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => i + 1), 150);
  }

  function reset() {
    setCardIndex(0);
    setFlipped(false);
    setKnown([]);
    setReview([]);
  }

  function switchDeck(i: number) {
    setActiveDeck(i);
    reset();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Flashcards</h1>
      <p className="text-[var(--foreground)]/60 mb-8">
        Click a card to reveal its meaning. Mark each one to track your progress.
      </p>

      {/* Deck selector */}
      <div className="flex flex-wrap gap-3 mb-10">
        {decks.map((d, i) => (
          <button
            key={d.id}
            onClick={() => switchDeck(i)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
              activeDeck === i
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-white text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]"
            )}
          >
            <Layers className="w-4 h-4" /> {d.name}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-[var(--foreground)]/50 mb-1">
          <span>Card {Math.min(cardIndex + 1, total)} of {total}</span>
          <span>{known.length} known · {review.length} to review</span>
        </div>
        <div className="bg-[var(--border)] rounded-full h-2">
          <div
            className="bg-[var(--secondary)] h-2 rounded-full transition-all"
            style={{ width: `${(cardIndex / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      {!done ? (
        <div className="mb-8">
          <div
            onClick={() => setFlipped(!flipped)}
            className={clsx(
              "relative w-full min-h-[240px] rounded-3xl cursor-pointer select-none transition-all duration-300",
              "border-2 flex flex-col items-center justify-center p-8 text-center shadow-md",
              flipped
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-white border-[var(--border)]"
            )}
          >
            {!flipped ? (
              <>
                <div className="text-4xl font-extrabold mb-3">{card.front}</div>
                <div className="text-[var(--foreground)]/40 text-sm">Click to reveal</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold mb-2">{card.back}</div>
                <div className="text-white/70 text-sm italic">{card.example}</div>
              </>
            )}
          </div>

          {flipped && (
            <div className="flex gap-4 mt-5 justify-center">
              <button
                onClick={() => next("review")}
                className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-full font-semibold hover:bg-red-200 transition-colors"
              >
                <ThumbsDown className="w-4 h-4" /> Still Learning
              </button>
              <button
                onClick={() => next("know")}
                className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold hover:bg-green-200 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" /> Got It!
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-[var(--border)] rounded-3xl p-10 text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Deck Complete!</h2>
          <p className="text-[var(--foreground)]/60 mb-6">
            <span className="text-green-600 font-semibold">{known.length} known</span> ·{" "}
            <span className="text-red-600 font-semibold">{review.length} to review</span>
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-2 mx-auto bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary-dark)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Start Over
          </button>
        </div>
      )}
    </div>
  );
}
