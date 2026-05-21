import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle.jsx';

export function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">SC</div>
            <div>
              <div className="font-semibold leading-tight">Smart College</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">Management System</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Link className={location.pathname.startsWith('/admin') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''} to="/admin">Admin</Link>
              <Link className={location.pathname.startsWith('/teacher') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''} to="/teacher">Teacher</Link>
              <Link className={location.pathname.startsWith('/student') ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''} to="/student">Student</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

