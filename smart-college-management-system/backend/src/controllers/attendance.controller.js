const jwt = require('jsonwebtoken');
// NOTE: MySQL removal is in progress; this handler is still using MySQL queries via pool placeholder.
const { pool } = require('../config/db');

function normalizeStatus(s) {
  const v = String(s).toLowerCase();
  if (v === 'present' || v === 'p') return 'present';
  if (v === 'absent' || v === 'a') return 'absent';
  return null;
}

async function qrCheckIn(req, res, next) {
  // Example QR: /api/attendance/qr/checkin?token=...
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ success: false, error: 'token required' });

    const payload = jwt.verify(token, process.env.QR_SECRET);

    const { student_id, course_id, subject_id, attendance_date } = payload;
    const status = 'present';

    await pool.query(
      `INSERT INTO attendance (student_id, teacher_id, course_id, subject_id, attendance_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [student_id, req.user.userId, course_id, subject_id, attendance_date, status]
    );

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function manualMarkAttendance(req, res, next) {
  try {
    const { student_id, course_id, subject_id, attendance_date, status } = req.body;
    const normalized = normalizeStatus(status);
    if (!student_id || !course_id || !subject_id || !attendance_date || !normalized) {
      return res.status(400).json({ success: false, error: 'Invalid fields' });
    }

    await pool.query(
      `INSERT INTO attendance (student_id, teacher_id, course_id, subject_id, attendance_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [student_id, req.user.userId, course_id, subject_id, attendance_date, normalized]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function attendancePercentage(req, res, next) {
  try {
    const student_id = req.user.role === 'student' ? req.user.userId : req.query.student_id;
    if (!student_id) return res.status(400).json({ success: false, error: 'student_id required' });

    const [rows] = await pool.query(
      `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status='present' THEN 1 ELSE 0 END) as present
      FROM attendance
      WHERE student_id = ?
      `,
      [student_id]
    );

    const total = rows[0].total;
    const present = rows[0].present;
    const percentage = total ? (present / total) * 100 : 0;

    res.json({ success: true, attendance: { total, present, percentage } });
  } catch (e) {
    next(e);
  }
}

module.exports = { qrCheckIn, manualMarkAttendance, attendancePercentage };

