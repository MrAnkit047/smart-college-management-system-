const express = require('express');
const { authRequired } = require('../middleware/auth');

const notificationsRoutes = express.Router();

// Simple placeholder endpoint for “real-time notifications”
// In a full project, store notifications in DB and fetch unread.
notificationsRoutes.use(authRequired);

notificationsRoutes.get('/unread', (req, res) => {
  res.json({
    success: true,
    notifications: []
  });
});

module.exports = { notificationsRoutes };

