"use client";

import { useState } from "react";

export function ContactEmailForm() {
  const [subject, setSubject] = useState("");

  const handleSend = () => {
    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    // Sanitize input: Strip HTML tags
    let sanitizedSubject = subject.replace(/<[^>]*>?/gm, "");

    // Limit to 200 characters
    if (sanitizedSubject.length > 200) {
      sanitizedSubject = sanitizedSubject.substring(0, 200);
    }

    const encodedSubject = encodeURIComponent(sanitizedSubject);
    window.location.href = `mailto:retro-54.wicket@icloud.com?subject=${encodedSubject}`;
  };

  return (
    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-0">
      <input
        type="text"
        placeholder="EMAIL SUBJECT"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        maxLength={200}
        className="flex-1 scribble-border border-r-0 rounded-none px-6 py-4 focus:outline-none font-bold placeholder:text-zinc-400 bg-white text-black"
      />
      <button
        onClick={handleSend}
        className="bg-primary text-white font-headline font-bold uppercase tracking-widest px-8 py-4 border-2 border-black active:translate-x-1 active:translate-y-1 transition-all"
      >
        SEND
      </button>
    </div>
  );
}
