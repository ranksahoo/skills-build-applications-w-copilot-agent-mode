import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('memberIds', 'name email').lean();
  res.status(200).json({ resource: 'teams', items: teams });
});

export default router;
