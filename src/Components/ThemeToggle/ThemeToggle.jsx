import React from 'react';
import { useTheme } from '../../Context/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="w-5 h-5 text-yellow-500 transition-all duration-300 transform rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 w-5 h-5 text-blue-500 transition-all duration-300 transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
};

export default ThemeToggle;