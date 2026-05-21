const mongoose = require('mongoose');

function getMongoUri() {
  return process.env.MONGO_URI || 'mongodb://localhost:27017/smart_college';
}

async function connectMongo() {
  const uri = getMongoUri();

  mongoose.set('strictQuery', true);

  // Avoid unhandled promise rejections / double connects
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = { connectMongo };

