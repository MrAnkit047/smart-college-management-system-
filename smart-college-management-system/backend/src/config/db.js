// MongoDB migration note:
// This file used to configure mysql2 pool. It has been replaced by MongoDB.
// Old controllers that still import { pool } must be migrated to use mongoose models.
// For now we provide a clear placeholder to avoid silent failures.

module.exports = {
  pool: {
    async query() {
      throw new Error('MySQL removed. Migrate controllers to MongoDB (mongoose) models.');
    }
  }
};



