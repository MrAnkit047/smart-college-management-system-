const express = require('express');
const { authRequired } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { listDashboardStats, createNotice, listNotices } = require('../controllers/admin.controller');

const adminRoutes = express.Router();

adminRoutes.use(authRequired, requireRole(['admin']));

adminRoutes.get('/dashboard/stats', listDashboardStats);
adminRoutes.post('/notices', createNotice);
adminRoutes.get('/notices', listNotices);

module.exports = { adminRoutes };

