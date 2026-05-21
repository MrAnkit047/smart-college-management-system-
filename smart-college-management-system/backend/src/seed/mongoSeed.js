const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const USERS = [
  { role: 'admin', name: 'Admin', email: 'admin@puc.edu.np', password: 'admin123' },
  { role: 'teacher', name: 'Teacher 1', email: 'teacher1@puc.edu.np', password: 'teacher123' },
  { role: 'student', name: 'Student 1', email: 'student1@puc.edu.np', password: 'student123' },
];

async function upsertUser({ role, name, email, password }) {
  const password_hash = await bcrypt.hash(password, 10);

  if (role === 'admin') {
    await Admin.updateOne({ email }, { $set: { name, password_hash } }, { upsert: true });
    return;
  }

  if (role === 'teacher') {
    await Teacher.updateOne({ email }, { $set: { name, password_hash } }, { upsert: true });
    return;
  }

  if (role === 'student') {
    await Student.updateOne({ email }, { $set: { name, password_hash } }, { upsert: true });
    return;
  }

  throw new Error(`Unknown role: ${role}`);
}

async function main() {
  // connectMongo is required from the running server config
  const { connectMongo } = require('../config/mongo');
  await connectMongo();

  for (const u of USERS) {
    // eslint-disable-next-line no-await-in-loop
    await upsertUser(u);
    // eslint-disable-next-line no-console
    console.log(`Seeded ${u.role}: ${u.email}`);
  }

  // eslint-disable-next-line no-console
  console.log('Mongo seeding complete.');
  process.exit(0);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Mongo seed failed:', e);
  process.exit(1);
});

