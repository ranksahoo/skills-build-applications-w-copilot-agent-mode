import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import activitiesRouter from './api/activities';
import leaderboardRouter from './api/leaderboard';
import teamsRouter from './api/teams';
import usersRouter from './api/users';
import workoutsRouter from './api/workouts';
import { connectToDatabase, mongoUri } from './database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log(`MongoDB connected: ${mongoUri}`);
    console.log(`API base URL: ${baseUrl}`);

    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
};

void startServer();
