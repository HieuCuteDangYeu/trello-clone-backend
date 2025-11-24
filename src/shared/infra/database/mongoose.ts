import { config } from '@config/index';
import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.databaseURL);

    console.log(`MongoDB Connected: ${connection.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1);
  }
};
