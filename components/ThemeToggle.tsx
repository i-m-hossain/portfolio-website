'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../app/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 dark:bg-white hover:cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5 " />
      )}
    </button>
  );
}