import React, { useEffect, useState } from 'react';
import { api } from '../auth/apiClient';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.get('/api/admin/dashboard/stats');
      setStats(res.data.stats);
    }
    load().catch(() => {});
  }, []);

  const chartData = {
    labels: ['Students', 'Teachers', 'Courses', 'Notices'],
    datasets: [
      {
        label: 'Counts',
        data: stats ? [stats.students, stats.teachers, stats.courses, stats.notices] : [0, 0, 0, 0],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">Overview & analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats && (
          <>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
              <div className="text-sm text-gray-500">Students</div>
              <div className="text-2xl font-bold">{stats.students}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
              <div className="text-sm text-gray-500">Teachers</div>
              <div className="text-2xl font-bold">{stats.teachers}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
              <div className="text-sm text-gray-500">Courses</div>
              <div className="text-2xl font-bold">{stats.courses}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-800/60">
              <div className="text-sm text-gray-500">Notices</div>
              <div className="text-2xl font-bold">{stats.notices}</div>
            </div>
          </>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Dashboard Analytics</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Sample Chart.js line view</div>
          </div>
        </div>
        <div className="mt-4">
          <Line data={chartData} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-4">
        <div className="font-semibold">Next modules</div>
        <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Manage Students/Teachers/Courses/Departments/Fees/Exam schedules & Attendance reports will be implemented on top of these routes.
        </div>
      </div>
    </div>
  );
}

