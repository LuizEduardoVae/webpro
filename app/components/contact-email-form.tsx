"use client";

import { useState } from "react";

export function ContactEmailForm() {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`Collaboration Request from ${email}`);
    const cc = encodeURIComponent(email);
    window.location.href = `mailto:retro-54.wicket@icloud.com?subject=${subject}&cc=${cc}`;
  };

  return (
    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-0">
      <input
        type="email"
        placeholder="YOUR EMAIL ADDRESS"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
