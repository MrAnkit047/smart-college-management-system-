import React, { useEffect, useState } from 'react';
import { api } from '../auth/apiClient';

export function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const p = await api.get('/api/student/me');
        setProfile(p.data.student);
        const a = await api.get('/api/attendance/percentage');
        setAttendance(a.data.attendance);
      } catch (e) {
        setError('Failed to load student data');
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Student Panel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">Attendance, notices, results & fee status</p>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
          <div className="text-sm text-gray-500">Name</div>
          <div className="font-bold">{profile?.name || '-'}</div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
          <div className="text-sm text-gray-500">Department</div>
          <div className="font-bold">{profile?.department_id || '-'}</div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
          <div className="text-sm text-gray-500">Attendance %</div>
          <div className="font-bold">{attendance ? `${attendance.percentage.toFixed(2)}%` : '-'}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-4">
        <div className="font-semibold">Modules to add</div>
        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Notices list, results list + PDF export, fee status, class routine and ID card download.
        </div>
      </div>
    </div>
  );
}

