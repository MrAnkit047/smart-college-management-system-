# TODO - Smart College Management System (Mongo-only)

## Goal
Complete migration so the app uses **MongoDB only** and login works.

## Steps
- [ ] (Already done) Backend boots using MongoDB and `/health` works.
- [ ] Remove/disable remaining MySQL references (mysql2 pool placeholder + any controllers/routes that still rely on MySQL).
- [ ] Create a Mongo seeding script that inserts Admin/Teacher/Student documents with bcrypt hashes matching: 
  - admin@puc.edu.np / admin123
  - teacher1@puc.edu.np / teacher123
  - student1@puc.edu.np / student123
- [ ] Wire seeding into README/run steps (or provide npm script `seed:mongo`).
- [ ] Verify login end-to-end via `/api/auth/login` and frontend login flow.

