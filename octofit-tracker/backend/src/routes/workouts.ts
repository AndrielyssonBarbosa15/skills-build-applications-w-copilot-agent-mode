import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Error fetching workouts' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ message: 'Error fetching workout' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(400).json({ message: 'Error creating workout' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, difficulty, duration, exercises } = req.body as {
      name?: string; description?: string; difficulty?: string;
      duration?: number; exercises?: string[];
    };
    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (difficulty !== undefined) update.difficulty = difficulty;
    if (duration !== undefined) update.duration = duration;
    if (exercises !== undefined) update.exercises = exercises;
    const workout = await Workout.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(400).json({ message: 'Error updating workout' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Error deleting workout' });
  }
});

export default router;
