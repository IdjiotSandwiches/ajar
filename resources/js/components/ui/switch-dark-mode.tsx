import React from 'react'
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';


export default function SwitchDarkMode() {

    const { appearance, updateAppearance } = useAppearance();

    const isDark =
        appearance === 'dark' ||
        (appearance === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);


    return (
        <button
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

    )
}
