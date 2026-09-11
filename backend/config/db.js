const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      console.log('Connecting to provided MongoDB URI...');
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    }

    console.log('No MONGODB_URI found. Initializing MongoMemoryServer for local development/testing...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    const uri = mongodInstance.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`In-Memory MongoDB Connected at: ${uri}`);
  } catch (error) {
    console.error(`Database Connection Warning/Error: ${error.message}`);
    // If external URI fails, try memory server fallback in development
    if (process.env.NODE_ENV !== 'production' && !mongodInstance) {
      try {
        console.log('Attempting fallback to MongoMemoryServer...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create();
        const uri = mongodInstance.getUri();
        await mongoose.connect(uri);
        console.log(`Fallback In-Memory MongoDB Connected: ${uri}`);
      } catch (fallbackError) {
        console.error('Critical Database connection failure:', fallbackError.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, disconnectDB };
