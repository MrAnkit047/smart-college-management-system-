const PDFDocument = require('pdfkit');
const { pool } = require('../config/db');

async function getSemesterResults(req, res, next) {
  try {
    const student_id = req.user.role === 'student' ? req.user.userId : req.query.student_id;
    const semester = req.query.semester;

    if (!student_id) return res.status(400).json({ success: false, error: 'student_id required' });

    const [rows] = await pool.query(
      `
      SELECT r.*, c.name as course_name
      FROM results r
      LEFT JOIN courses c ON c.id = r.course_id
      WHERE r.student_id = ?
      ${semester ? 'AND r.semester = ?' : ''}
      ORDER BY r.course_id
      `,
      semester ? [student_id, semester] : [student_id]
    );

    // GPA avg
    const gpas = rows.map(r => Number(r.gpa || 0));
    const avgGpa = gpas.length ? gpas.reduce((a,b)=>a+b,0)/gpas.length : 0;

    res.json({ success: true, results: rows, gpa: avgGpa });
  } catch (e) {
    next(e);
  }
}

async function exportResultPdf(req, res, next) {
  try {
    const student_id = req.user.userId;
    const semester = req.query.semester;

    const [rows] = await pool.query(
      `
      SELECT r.*, c.name as course_name
      FROM results r
      LEFT JOIN courses c ON c.id = r.course_id
      WHERE r.student_id = ? AND (? IS NULL OR r.semester = ?)
      ORDER BY r.course_id
      `,
      [student_id, semester || null, semester || null]
    );

    const gpas = rows.map(r => Number(r.gpa || 0));
    const avgGpa = gpas.length ? gpas.reduce((a,b)=>a+b,0)/gpas.length : 0;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="RESULT.pdf"');

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    doc.fontSize(18).text('Smart College Management System', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Semester Result`, { align: 'center' });
    doc.fontSize(12).text(`Semester: ${semester || 'All'}`, { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12).text(`CGPA (avg): ${avgGpa.toFixed(2)}`);
    doc.moveDown();

    doc.fontSize(10);
    rows.forEach(r => {
      doc.text(`${r.course_name} - Marks: ${r.marks_obtained}/${r.total_marks} - %: ${Number(r.percentage).toFixed(2)} - GPA: ${Number(r.gpa).toFixed(2)}`);
    });

    doc.end();
  } catch (e) {
    next(e);
  }
}

module.exports = { getSemesterResults, exportResultPdf };

