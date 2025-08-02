// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Loads .env variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database Connected');
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
