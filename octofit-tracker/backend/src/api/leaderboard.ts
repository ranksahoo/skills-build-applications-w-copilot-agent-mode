import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('userId', 'name email')
    .sort({ rank: 1 })
    .lean();
  res.status(200).json({ resource: 'leaderboard', items: leaderboard });
});

export default router;
