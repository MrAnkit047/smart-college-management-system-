const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { email, password } = req.body;

    const [admin, teacher, student] = await Promise.all([
      Admin.findOne({ email }).lean(),
      Teacher.findOne({ email }).lean(),
      Student.findOne({ email }).lean()
    ]);

    const match = admin
      ? { role: 'admin', userId: String(admin._id), password_hash: admin.password_hash }
      : teacher
        ? { role: 'teacher', userId: String(teacher._id), password_hash: teacher.password_hash }
        : student
          ? { role: 'student', userId: String(student._id), password_hash: student.password_hash }
          : null;

    if (!match) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, match.password_hash);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ userId: match.userId, role: match.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      success: true,
      token,
      role: match.role
    });
  } catch (e) {
    next(e);
  }
}

async function signup(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { role, name, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    if (role === 'teacher') {
      const doc = await Teacher.create({ name, email, password_hash });
      const token = jwt.sign({ userId: String(doc._id), role: 'teacher' }, process.env.JWT_SECRET, { expiresIn: '8h' });
      return res.status(201).json({ success: true, token, role: 'teacher' });
    }

    // student
    const doc = await Student.create({ name, email, password_hash });
    const token = jwt.sign({ userId: String(doc._id), role: 'student' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.status(201).json({ success: true, token, role: 'student' });
  } catch (e) {
    // handle duplicate email
    if (String(e?.message || '').toLowerCase().includes('duplicate')) {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    // mongoose duplicate key error
    if (e?.code === 11000) {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    next(e);
  }
}

module.exports = { login, signup };


