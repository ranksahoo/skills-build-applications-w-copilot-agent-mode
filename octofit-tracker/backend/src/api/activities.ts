import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('userId', 'name email').lean();
  res.status(200).json({ resource: 'activities', items: activities });
});

export default router;
