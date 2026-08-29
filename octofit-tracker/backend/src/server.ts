import express, { Request, Response } from 'express';
import connectToDatabase from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const PORT = 8000;
const API_BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  res.json(await User.find().sort({ username: 1 }));
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  res.json(await Team.find().populate('members', 'username firstName lastName'));
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  res.json(await Activity.find().populate('user', 'username firstName lastName').sort({ completedAt: -1 }));
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  res.json(await Leaderboard.find().populate('user', 'username firstName lastName').sort({ rank: 1 }));
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  res.json(await Workout.find().sort({ difficulty: 1, name: 1 }));
});

app.use((error: Error, _req: Request, res: Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  res.status(500).json({ error: 'Unable to load data' });
});

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API running at ${API_BASE_URL}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
