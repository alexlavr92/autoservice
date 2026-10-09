'use client';

import {useEffect} from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {useTheme} from 'next-themes';

export const THEME_MODE_STORAGE_KEY = 'autoservice-theme-mode';

function getTimeBasedTheme() {
    const hour = new Date().getHours();
    return hour >= 8 && hour < 20 ? 'light' : 'dark';
}

function getTimeUntilThemeChange() {
    const now = new Date();
    const nextChange = new Date(now);
    nextChange.setSeconds(0, 0);

    if (now.getHours() < 8) {
        nextChange.setHours(8, 0, 0, 0);
    } else if (now.getHours() < 20) {
        nextChange.setHours(20, 0, 0, 0);
    } else {
        nextChange.setDate(nextChange.getDate() + 1);
        nextChange.setHours(8, 0, 0, 0);
    }

    return nextChange.getTime() - now.getTime();
}

function TimeBasedTheme() {
    const {setTheme} = useTheme();

    useEffect(() => {
        let mode = localStorage.getItem(THEME_MODE_STORAGE_KEY);

        if (!mode) {
            mode = localStorage.getItem('theme') ? 'manual' : 'automatic';
            localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
        }

        if (mode !== 'automatic') return;

        let timeoutId;
        const applyTheme = () => {
            setTheme(getTimeBasedTheme());
            timeoutId = window.setTimeout(applyTheme, getTimeUntilThemeChange());
        };

        applyTheme();

        return () => window.clearTimeout(timeoutId);
    }, [setTheme]);

    return null;
}

export function ThemeProvider({ children, ...props }) {
    return (
        <NextThemesProvider {...props}>
            <TimeBasedTheme />
            {children}
        </NextThemesProvider>
    );
}
