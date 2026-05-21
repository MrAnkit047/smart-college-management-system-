const mongoose = require('mongoose');

function createBaseSchema(schemaDefinition) {
  const schema = new mongoose.Schema(schemaDefinition, { timestamps: true });
  return schema;
}

module.exports = { createBaseSchema };

