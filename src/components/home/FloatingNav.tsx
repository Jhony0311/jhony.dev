'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { navigation } from './home-data';

export function FloatingNav() {
    const [isDark, setIsDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Initialise theme from system preference
    useEffect(() => {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        const stored = localStorage.getItem('theme');
        const dark = stored ? stored === 'dark' : prefersDark;
        setIsDark(dark);
        document.documentElement.classList.toggle('dark', dark);
    }, []);

    // Detect scroll to tighten the nav background
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 16);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    function toggleTheme() {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    }

    return (
        <header
            style={{
                position: 'fixed',
                top: '1.25rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                width: 'min(calc(100% - 2rem), 1200px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <nav
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '9999px',
                    background: 'var(--nav-bg)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    boxShadow: scrolled
                        ? 'var(--nav-shadow)'
                        : '0 0 0 1px var(--line)',
                    transition: 'box-shadow 0.3s ease',
                }}
            >
                {/* Wordmark */}
                <a
                    href="/"
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: 'var(--text)',
                        textDecoration: 'none',
                    }}
                >
                    jhony.dev
                </a>

                {/* Links + theme toggle */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                    }}
                >
                    {navigation.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.8125rem',
                                fontWeight: 400,
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                padding: '0.375rem 0.75rem',
                                borderRadius: '9999px',
                                transition:
                                    'color 0.2s ease, background 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLAnchorElement
                                ).style.color = 'var(--text)';
                                (
                                    e.currentTarget as HTMLAnchorElement
                                ).style.background = 'var(--bg-inset)';
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLAnchorElement
                                ).style.color = 'var(--text-muted)';
                                (
                                    e.currentTarget as HTMLAnchorElement
                                ).style.background = 'transparent';
                            }}
                        >
                            {item.label}
                        </a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        aria-label={
                            isDark
                                ? 'Switch to light theme'
                                : 'Switch to dark theme'
                        }
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            border: 'none',
                            background: 'var(--bg-inset)',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            marginLeft: '0.25rem',
                            transition: 'color 0.2s ease, background 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color =
                                'var(--text)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color =
                                'var(--text-muted)';
                        }}
                    >
                        {isDark ? (
                            <Sun size={15} weight="bold" />
                        ) : (
                            <Moon size={15} weight="bold" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}
