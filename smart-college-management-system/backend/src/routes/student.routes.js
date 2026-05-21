const express = require('express');
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { getStudentProfile, getAttendance, getNotices, getResults, getFeeStatus, downloadIdCard, getRoutine } = require('../controllers/student.controller');

const studentRoutes = express.Router();
studentRoutes.use(authRequired, requireRole(['student']));

studentRoutes.get('/me', getStudentProfile);
studentRoutes.get('/attendance', getAttendance);
studentRoutes.get('/notices', getNotices);
studentRoutes.get('/results', getResults);
studentRoutes.get('/fee-status', getFeeStatus);
studentRoutes.get('/routine', getRoutine);
studentRoutes.get('/id-card', downloadIdCard);

module.exports = { studentRoutes };

