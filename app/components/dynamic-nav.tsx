"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function DynamicNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-black bg-white/80 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-black tracking-widest font-headline uppercase"
        >
          LUIZ
        </Link>
        <div className="hidden md:flex gap-8 font-headline uppercase tracking-tighter">
          <a
            href="#projects"
            onClick={(e) => handleClick(e, "projects")}
            className={`transition-colors cursor-pointer ${
              activeSection === "projects"
                ? "text-black font-black border-b-4 border-black pb-1"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Projects
          </a>
          <a
            href="#videos"
            onClick={(e) => handleClick(e, "videos")}
            className={`transition-colors cursor-pointer ${
              activeSection === "videos"
                ? "text-black font-black border-b-4 border-black pb-1"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Videos
          </a>
          <a
            href="#research"
            onClick={(e) => handleClick(e, "research")}
            className={`transition-colors cursor-pointer ${
              activeSection === "research"
                ? "text-black font-black border-b-4 border-black pb-1"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Research Area
          </a>
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "contact")}
            className={`transition-colors cursor-pointer ${
              activeSection === "contact" || activeSection === "journey"
                ? "text-black font-black border-b-4 border-black pb-1"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Me/Contact
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="bg-primary text-on-primary-container px-6 py-1 font-headline uppercase tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            All Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
