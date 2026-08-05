"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { navigation } from "../home/home-data";
import { useTheme } from "../../hooks/useTheme";
import { IconAction } from "./IconAction";

export function FloatingNav() {
  const [{ isDark }, setTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to tighten the nav background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header className="fixed top-5 left-1/2 z-100 w-[min(calc(100%-2rem),75rem)] -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <nav
        className={[
          "flex items-center justify-between rounded-full px-5 py-2.5 backdrop-blur-[14px] transition-shadow duration-300",
          scrolled ? "bg-nav shadow-nav" : "bg-nav ring-1 ring-line",
        ].join(" ")}
      >
        {/* Wordmark */}
        <a
          href="/"
          className="font-mono text-sm font-semibold tracking-[-0.02em] text-ink no-underline"
        >
          jhony.dev
        </a>

        {/* Links + theme toggle */}
        <div className="flex items-center gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-mono text-xs text-ink-muted no-underline transition-colors duration-200 hover:bg-canvas-inset hover:text-ink"
            >
              {item.label}
            </a>
          ))}

          <IconAction
            onClick={toggleTheme}
            ariaLabel={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="ml-1 h-8 w-8 text-ink-muted hover:text-ink"
          >
            {isDark ? <SunIcon size={15} weight="bold" /> : <MoonIcon size={15} weight="bold" />}
          </IconAction>
        </div>
      </nav>
    </header>
  );
}
