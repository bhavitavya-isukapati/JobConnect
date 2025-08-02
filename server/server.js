import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import applyRoutes from './routes/apply.js';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded resumes (if saving resumes)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/apply', applyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes); // Register admin routes 
app.use('/api/users', userRoutes);

// Connect to DB and start server
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
