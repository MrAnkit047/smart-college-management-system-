const express = require('express');
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { getTeacherSubjects, markAttendance, uploadMarks, createNotice, getStudentReports } = require('../controllers/teacher.controller');

const teacherRoutes = express.Router();
teacherRoutes.use(authRequired, requireRole(['teacher']));

teacherRoutes.get('/subjects', getTeacherSubjects);
teacherRoutes.post('/attendance', markAttendance);
teacherRoutes.post('/marks', uploadMarks);
teacherRoutes.post('/notices', createNotice);
teacherRoutes.get('/reports', getStudentReports);

module.exports = { teacherRoutes };

