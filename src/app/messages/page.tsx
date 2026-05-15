"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2, BookOpen } from "lucide-react";
import clsx from "clsx";

type Message = {
  id: string;
  sender: "student" | "teacher";
  content: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => { setMessages(data); setLoading(false); });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input.trim() }),
    });
    const msg = await res.json();
    setMessages((m) => [...m, msg]);
    setInput("");
    setSending(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col" style={{ height: "calc(100vh - 5rem)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)] mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold">Mwalimu Doreen</div>
          <div className="text-xs text-[var(--secondary)]">● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--foreground)]/30" />
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-3">👋</div>
            <p className="font-semibold mb-1">Start a conversation</p>
            <p className="text-[var(--foreground)]/50 text-sm max-w-xs">
              Send Mwalimu Doreen a message — ask questions, request feedback, or arrange your next lesson.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={clsx("flex", m.sender === "student" ? "justify-end" : "justify-start")}
          >
            <div
              className={clsx(
                "max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                m.sender === "student"
                  ? "bg-[var(--primary)] text-white rounded-br-sm"
                  : "bg-white border border-[var(--border)] text-[var(--foreground)] rounded-bl-sm"
              )}
            >
              {m.sender === "teacher" && (
                <div className="text-xs font-semibold text-[var(--accent)] mb-1">Mwalimu Doreen</div>
              )}
              {m.content}
              <div className={clsx("text-xs mt-1", m.sender === "student" ? "text-white/50" : "text-[var(--foreground)]/30")}>
                {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={send} className="flex gap-3 mt-4 pt-4 border-t border-[var(--border)]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Mwalimu Doreen..."
          className="flex-1 border border-[var(--border)] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
        />
        <button
          type="submit" disabled={sending || !input.trim()}
          className="w-11 h-11 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center justify-center transition-colors disabled:opacity-40 flex-shrink-0"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
