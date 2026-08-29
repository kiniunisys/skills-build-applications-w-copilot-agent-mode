import express, { Request, Response } from 'express';
import connectToDatabase from './config/database';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
