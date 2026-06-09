import express from 'express';
import mongoose from 'mongoose';

const app = express();
const apiPort = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(apiPort, () => {
      console.log(`OctoFit backend running on port ${apiPort}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

void start();
