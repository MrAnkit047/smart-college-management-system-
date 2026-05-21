# TODO (MySQL removal -> Mongo replacement)

- [ ] Replace MySQL-based controllers (attendance/admin/teacher/student/results) with MongoDB/ mongoose-based implementations OR disable them to avoid runtime MySQL queries.
- [ ] Remove MySQL runtime placeholder: `smart-college-management-system/backend/src/config/db.js`.
- [ ] Delete MySQL schema/seed artifacts:
  - [ ] `smart-college-management-system/db/schema.sql`
  - [ ] `smart-college-management-system/backend/seed/seed.sql`
  - [ ] `smart-college-management-system/backend/seed/seed_with_plaintext_passwords.sql`
- [ ] Update documentation (`backend/README.md`, root README/TODO) to remove MySQL mentions.
- [ ] Ensure Mongo seeding uses `backend/src/seed/mongoSeed.js` and run it once to verify.
- [ ] Run backend lint/start tests to confirm no references to MySQL remain.
