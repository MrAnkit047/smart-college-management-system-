const express = require('express');
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { getSemesterResults, exportResultPdf } = require('../controllers/results.controller');

const resultsRoutes = express.Router();

resultsRoutes.use(authRequired);
resultsRoutes.get('/semester', requireRole(['student', 'teacher']), getSemesterResults);
resultsRoutes.get('/export/pdf', requireRole(['student']), exportResultPdf);

module.exports = { resultsRoutes };

