import React from 'react';

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Teacher Panel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">Mark attendance, upload marks & create notices</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-4">
        <div className="font-semibold">Modules to add</div>
        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Subjects view, manual/QR attendance marking, marks upload, notice creation, student reports.
        </div>
      </div>
    </div>
  );
}

