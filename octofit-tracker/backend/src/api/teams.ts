import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ resource: 'teams', items: [] });
});

export default router;
