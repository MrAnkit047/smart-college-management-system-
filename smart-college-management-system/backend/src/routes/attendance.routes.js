const express = require('express');
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { qrCheckIn, manualMarkAttendance, attendancePercentage } = require('../controllers/attendance.controller');

const attendanceRoutes = express.Router();

// teacher can mark
attendanceRoutes.use(authRequired);
attendanceRoutes.get('/qr/checkin', requireRole(['teacher']), qrCheckIn);
attendanceRoutes.post('/manual', requireRole(['teacher']), manualMarkAttendance);
attendanceRoutes.get('/percentage', requireRole(['student', 'teacher']), attendancePercentage);

module.exports = { attendanceRoutes };

