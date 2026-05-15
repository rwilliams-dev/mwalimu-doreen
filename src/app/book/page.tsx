"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle2, Loader2, ChevronRight } from "lucide-react";
import clsx from "clsx";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

function getNextDays(n: number) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(d);
    }
  }
  return days.slice(0, 7);
}

export default function BookPage() {
  const days = getNextDays(14);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  async function handleBook() {
    if (!selectedDay || !selectedSlot) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking_date: selectedDay.toISOString().split("T")[0],
        time_slot: selectedSlot,
        notes,
      }),
    });
    if (res.ok) {
      setBooked(true);
    } else {
      setError("Booking failed. Please try again.");
    }
    setLoading(false);
  }

  if (booked) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Lesson Booked!</h2>
        <p className="text-[var(--foreground)]/60 mb-2">
          Your session with Mwalimu Doreen on{" "}
          <strong>{selectedDay?.toDateString()}</strong> at <strong>{selectedSlot}</strong> is confirmed.
        </p>
        <p className="text-[var(--foreground)]/40 text-sm mb-8">
          Doreen will send you a meeting link via messages before your session.
        </p>
        <a href="/messages" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          Open Messages <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Book a Live Lesson</h1>
      <p className="text-[var(--foreground)]/60 mb-10">
        One-on-one sessions with Mwalimu Doreen via video call. Select a date and time that works for you.
      </p>

      {/* Step 1: Date */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
          <Calendar className="w-5 h-5 text-[var(--primary)]" /> Choose a date
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {days.map((d) => {
            const isSelected = selectedDay?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                onClick={() => { setSelectedDay(d); setSelectedSlot(null); }}
                className={clsx(
                  "rounded-2xl p-3 text-center border-2 transition-all",
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] hover:border-[var(--primary)] bg-white"
                )}
              >
                <div className="text-xs font-medium opacity-70">
                  {d.toLocaleDateString("en", { weekday: "short" })}
                </div>
                <div className="text-xl font-extrabold">{d.getDate()}</div>
                <div className="text-xs opacity-70">
                  {d.toLocaleDateString("en", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Time */}
      {selectedDay && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
            <Clock className="w-5 h-5 text-[var(--primary)]" /> Choose a time (EAT)
          </h2>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={clsx(
                  "px-5 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all",
                  selectedSlot === slot
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] hover:border-[var(--primary)] bg-white"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Notes + confirm */}
      {selectedSlot && (
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Lesson details</h2>
          <div className="bg-[var(--muted)] rounded-xl p-4 mb-4 text-sm">
            <p><strong>Date:</strong> {selectedDay?.toDateString()}</p>
            <p><strong>Time:</strong> {selectedSlot} (East Africa Time)</p>
            <p><strong>Format:</strong> Video call (link sent via messages)</p>
          </div>
          <label className="text-sm font-medium block mb-2">
            What would you like to focus on? (optional)
          </label>
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            rows={3} placeholder="e.g. I want to practice verb conjugations and conversational phrases..."
            className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] resize-none mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleBook} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}
