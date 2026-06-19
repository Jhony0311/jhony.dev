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
    <header
      style={{
        position: "fixed",
        top: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "min(calc(100% - 2rem), 1200px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <nav
        className={scrolled ? "bg-nav shadow-nav" : "bg-nav ring-1 ring-line"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.625rem 1.25rem",
          borderRadius: "9999px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          className="font-mono text-sm font-semibold tracking-[-0.02em]"
          style={{
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          jhony.dev
        </a>

        {/* Links + theme toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-inset)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {item.label}
            </a>
          ))}

          <IconAction
            onClick={toggleTheme}
            ariaLabel={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="ml-1 h-8 w-8 text-ink-muted"
            hoverBackground="var(--bg-subtle)"
            hoverForeground="var(--text)"
          >
            {isDark ? <SunIcon size={15} weight="bold" /> : <MoonIcon size={15} weight="bold" />}
          </IconAction>
        </div>
      </nav>
    </header>
  );
}
