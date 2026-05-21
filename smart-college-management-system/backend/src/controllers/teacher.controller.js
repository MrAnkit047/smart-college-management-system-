// NOTE: MySQL removal is in progress; this handler is still using MySQL queries via pool placeholder.
const { pool } = require('../config/db');

async function getTeacherSubjects(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
      SELECT s.*, c.name as course_name
      FROM teacher_subjects s
      LEFT JOIN courses c ON c.id = s.course_id
      WHERE s.teacher_id = ?
      `,
      [req.user.userId]
    );

    res.json({ success: true, subjects: rows });
  } catch (e) {
    next(e);
  }
}

async function markAttendance(req, res, next) {
  try {
    const { student_id, course_id, subject_id, attendance_date, status } = req.body;
    if (!student_id || !course_id || !subject_id || !attendance_date || !status) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    await pool.query(
      `INSERT INTO attendance (student_id, teacher_id, course_id, subject_id, attendance_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [student_id, req.user.userId, course_id, subject_id, attendance_date, status]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function uploadMarks(req, res, next) {
  try {
    const { student_id, course_id, semester, marks_obtained, total_marks } = req.body;
    if (!student_id || !course_id || !semester || marks_obtained == null || !total_marks) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    // GPA/grade mapping simplified
    const percentage = (Number(marks_obtained) / Number(total_marks)) * 100;
    const gpa = percentage >= 90 ? 4.0 : percentage >= 80 ? 3.6 : percentage >= 70 ? 3.2 : percentage >= 60 ? 2.8 : 0.0;

    await pool.query(
      `INSERT INTO results (student_id, teacher_id, course_id, semester, marks_obtained, total_marks, percentage, gpa)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [student_id, req.user.userId, course_id, semester, marks_obtained, total_marks, percentage, gpa]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function createNotice(req, res, next) {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ success: false, error: 'title and body are required' });

    await pool.query(
      `INSERT INTO notices (title, body, created_by_teacher_id) VALUES (?, ?, ?)`,
      [title, body, req.user.userId]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function getStudentReports(req, res, next) {
  try {
    const { student_id } = req.query;
    if (!student_id) return res.status(400).json({ success: false, error: 'student_id required' });

    const [attendanceRows] = await pool.query(
      `SELECT * FROM attendance WHERE student_id = ? ORDER BY attendance_date DESC LIMIT 100`,
      [student_id]
    );

    const [resultRows] = await pool.query(
      `SELECT * FROM results WHERE student_id = ? ORDER BY semester DESC LIMIT 50`,
      [student_id]
    );

    res.json({ success: true, attendance: attendanceRows, results: resultRows });
  } catch (e) {
    next(e);
  }
}

module.exports = { getTeacherSubjects, markAttendance, uploadMarks, createNotice, getStudentReports };

