import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/application.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*'
  })
);

app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;

  console.log('MongoDB connected');
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'SkillAiro Careers API'
  });
});

// MongoDB connection FIRST
app.use(async (req, res, next) => {
  // Health check doesn't need database
  if (req.path === '/api/health') {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    res.status(500).json({
      ok: false,
      message: 'Database connection failed'
    });
  }
});

// Routes AFTER database connection
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
export { connectDB };