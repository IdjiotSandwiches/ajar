import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'appearance';

const prefersDark = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    const isDark =
        appearance === 'dark' ||
        (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
};

const getSavedAppearance = (): Appearance =>
    (localStorage.getItem(STORAGE_KEY) as Appearance) || 'system';

const mediaQuery = () =>
    typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

const handleSystemThemeChange = () => {
    applyTheme(getSavedAppearance());
};

/**
 * Dipanggil SATU KALI di app.tsx
 */
export function initializeTheme() {
    applyTheme(getSavedAppearance());
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

/**
 * Dipakai di component (Navbar, Settings, dll)
 */
export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem(STORAGE_KEY, mode);
        setCookie(STORAGE_KEY, mode);
        applyTheme(mode);
    }, []);

    useEffect(() => {
        updateAppearance(getSavedAppearance());

        return () =>
            mediaQuery()?.removeEventListener(
                'change',
                handleSystemThemeChange
            );
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
