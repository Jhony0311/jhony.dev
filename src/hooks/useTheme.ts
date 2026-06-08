import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeState = {
    theme: Theme;
    isDark: boolean;
    isLight: boolean;
};

const COOKIE_NAME = 'theme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
                '=([^;]*)',
        ),
    );
    return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function parseTheme(val: string | undefined): Theme {
    if (val === 'dark' || val === 'light' || val === 'system') return val;
    return 'system';
}

function getInitialState(): ThemeState {
    const theme = parseTheme(getCookie(COOKIE_NAME));
    // Source of truth: document class (set by the inline script before hydration)
    const isDark = document.documentElement.classList.contains('dark');
    return { theme, isDark, isLight: !isDark };
}

export function useTheme(): [ThemeState, (theme: Theme) => void] {
    const [state, setState] = useState<ThemeState>(() => {
        if (typeof window === 'undefined') {
            return { theme: 'system', isDark: false, isLight: true };
        }
        return getInitialState();
    });

    // Respond to system preference changes only when theme is 'system'
    useEffect(() => {
        if (state.theme !== 'system') return;

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            const isDark = e.matches;
            document.documentElement.classList.toggle('dark', isDark);
            setState({ theme: 'system', isDark, isLight: !isDark });
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [state.theme]);

    const setTheme = (nextTheme: Theme): void => {
        let isDark: boolean;
        if (nextTheme === 'dark') {
            isDark = true;
        } else if (nextTheme === 'light') {
            isDark = false;
        } else {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        document.documentElement.classList.toggle('dark', isDark);
        setCookie(COOKIE_NAME, nextTheme);
        setState({ theme: nextTheme, isDark, isLight: !isDark });
    };

    return [state, setTheme];
}
