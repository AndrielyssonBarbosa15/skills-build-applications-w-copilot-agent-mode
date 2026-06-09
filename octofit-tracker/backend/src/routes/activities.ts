import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Error fetching activity' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(400).json({ message: 'Error creating activity' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { userId, activityType, duration, distance, caloriesBurned, date } = req.body as {
      userId?: string; activityType?: string; duration?: number;
      distance?: number; caloriesBurned?: number; date?: Date;
    };
    const update: Record<string, unknown> = {};
    if (userId !== undefined) update.userId = userId;
    if (activityType !== undefined) update.activityType = activityType;
    if (duration !== undefined) update.duration = duration;
    if (distance !== undefined) update.distance = distance;
    if (caloriesBurned !== undefined) update.caloriesBurned = caloriesBurned;
    if (date !== undefined) update.date = date;
    const activity = await Activity.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(400).json({ message: 'Error updating activity' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Error deleting activity' });
  }
});

export default router;
