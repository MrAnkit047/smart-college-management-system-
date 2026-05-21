const express = require('express');
const { body } = require('express-validator');
const { login, signup } = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  login
);

authRoutes.post(
  '/signup',
  [
    body('role').isIn(['student', 'teacher']).withMessage('Role must be student or teacher'),
    body('name').isLength({ min: 2 }).withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  signup
);

module.exports = { authRoutes };

