// NOTE: MySQL removal is in progress; this handler is still using MySQL queries via pool placeholder.
const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

async function listDashboardStats(req, res, next) {
  try {
    const [studentCount] = await pool.query(`SELECT COUNT(*) as c FROM students`);
    const [teacherCount] = await pool.query(`SELECT COUNT(*) as c FROM teachers`);
    const [courseCount] = await pool.query(`SELECT COUNT(*) as c FROM courses`);
    const [noticeCount] = await pool.query(`SELECT COUNT(*) as c FROM notices`);

    res.json({
      success: true,
      stats: {
        students: studentCount[0].c,
        teachers: teacherCount[0].c,
        courses: courseCount[0].c,
        notices: noticeCount[0].c
      }
    });
  } catch (e) {
    next(e);
  }
}

async function createNotice(req, res, next) {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ success: false, error: 'title and body are required' });

    await pool.query(
      `INSERT INTO notices (title, body, created_by_admin_id) VALUES (?, ?, ?)`,
      [title, body, req.user.userId]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function listNotices(req, res, next) {
  try {
    const { limit = 20 } = req.query;
    const [rows] = await pool.query(`SELECT * FROM notices ORDER BY created_at DESC LIMIT ?`, [Number(limit)]);
    res.json({ success: true, notices: rows });
  } catch (e) {
    next(e);
  }
}

module.exports = { listDashboardStats, createNotice, listNotices };

