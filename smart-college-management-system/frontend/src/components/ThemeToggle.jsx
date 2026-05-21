import React, { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm"
    >
      {dark ? 'Dark' : 'Light'}
    </button>
  );
}

