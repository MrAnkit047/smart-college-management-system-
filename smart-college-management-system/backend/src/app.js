const express = require('express');
const cors = require('cors');
const { authRoutes } = require('./routes/auth.routes');
const { adminRoutes } = require('./routes/admin.routes');
const { studentRoutes } = require('./routes/student.routes');
const { teacherRoutes } = require('./routes/teacher.routes');
const { attendanceRoutes } = require('./routes/attendance.routes');
const { resultsRoutes } = require('./routes/results.routes');
const { notificationsRoutes } = require('./routes/notifications.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/notifications', notificationsRoutes);

app.use(errorHandler);

module.exports = { app };


