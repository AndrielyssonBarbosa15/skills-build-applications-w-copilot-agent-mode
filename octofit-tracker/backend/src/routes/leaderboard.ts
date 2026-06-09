import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find().sort({ totalPoints: -1, rank: 1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Error fetching leaderboard entry:', error);
    res.status(500).json({ message: 'Error fetching leaderboard entry' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    res.status(400).json({ message: 'Error creating leaderboard entry' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, username, totalPoints, rank } = req.body as {
      userId?: string; username?: string; totalPoints?: number; rank?: number;
    };
    const update: Record<string, unknown> = {};
    if (userId !== undefined) update.userId = userId;
    if (username !== undefined) update.username = username;
    if (totalPoints !== undefined) update.totalPoints = totalPoints;
    if (rank !== undefined) update.rank = rank;
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Error updating leaderboard entry:', error);
    res.status(400).json({ message: 'Error updating leaderboard entry' });
  }
});

export default router;
