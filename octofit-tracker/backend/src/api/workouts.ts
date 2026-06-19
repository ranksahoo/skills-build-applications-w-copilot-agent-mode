import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('userId', 'name email').lean();
  res.status(200).json({ resource: 'workouts', items: workouts });
});

export default router;
