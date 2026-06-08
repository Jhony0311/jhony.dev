import { useState, useSyncExternalStore } from 'react';

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

function getInitialTheme(): Theme {
    return parseTheme(getCookie(COOKIE_NAME));
}

function getIsDark(theme: Theme): boolean {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // In system mode, document class is the source of truth.
    return document.documentElement.classList.contains('dark');
}

function getSystemThemeSnapshot(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useTheme(): [ThemeState, (theme: Theme) => void] {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') {
            return 'system';
        }
        return getInitialTheme();
    });

    const systemIsDark = useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === 'undefined') return () => {};

            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (e: MediaQueryListEvent) => {
                if (theme === 'system') {
                    document.documentElement.classList.toggle(
                        'dark',
                        e.matches,
                    );
                }
                onStoreChange();
            };

            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        },
        getSystemThemeSnapshot,
        () => false,
    );

    const setTheme = (nextTheme: Theme): void => {
        let isDark: boolean;
        if (nextTheme === 'dark') {
            isDark = true;
        } else if (nextTheme === 'light') {
            isDark = false;
        } else {
            isDark = getSystemThemeSnapshot();
        }

        document.documentElement.classList.toggle('dark', isDark);
        setCookie(COOKIE_NAME, nextTheme);
        setThemeState(nextTheme);
    };

    const isDark =
        typeof window === 'undefined'
            ? false
            : theme === 'system'
              ? systemIsDark
              : getIsDark(theme);

    return [{ theme, isDark, isLight: !isDark }, setTheme];
}
