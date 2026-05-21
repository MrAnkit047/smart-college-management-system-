const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true },
    department_id: { type: Number, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);

