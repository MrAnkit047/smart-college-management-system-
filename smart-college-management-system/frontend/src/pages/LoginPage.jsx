import React, { useState } from 'react';
import { api } from '../auth/apiClient';
import { useAuth } from '../auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const payload = mode === 'login' ? { email, password } : { role, name, email, password };

      const res = await api.post(endpoint, payload);


      const { token, role: userRole } = res.data;
      localStorage.setItem('token', token);
      const decoded = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      setUser({ role: decoded.role, userId: decoded.userId });

      navigate(userRole === 'admin' ? '/admin' : userRole === 'teacher' ? '/teacher' : '/student');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 p-6 fade-in">
        <div className="text-center">
          <div className="text-2xl font-bold">Smart College</div>
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">Admin / Teacher / Student</div>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button
            className={mode === 'login' ? 'px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm' : 'px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm'}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'signup' ? 'px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm' : 'px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm'}
            onClick={() => setMode('signup')}
          >
            Signup
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-sm">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                >
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                  placeholder="Full name"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-300 text-center">
            Dummy accounts after seed: <span className="font-medium">admin@puc.edu.np</span>, <span className="font-medium">teacher1@puc.edu.np</span>, <span className="font-medium">student1@puc.edu.np</span> (password hash placeholder)
          </div>
        </form>
      </div>
    </div>
  );
}

