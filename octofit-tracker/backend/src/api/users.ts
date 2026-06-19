import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.status(200).json({ resource: 'users', items: users });
});

export default router;
