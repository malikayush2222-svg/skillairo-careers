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

app.get('/api/health', (req, res) =>
  res.json({
    ok: true,
    service: 'SkillAiro Careers API'
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(port, () =>
      console.log(`API running on ${port}`)
    )
  )
  .catch((e) => {
    console.error(
      'MongoDB connection failed:',
      e.message
    );

    app.listen(port, () =>
      console.log(
        `API running without DB on ${port}`
      )
    );
  });