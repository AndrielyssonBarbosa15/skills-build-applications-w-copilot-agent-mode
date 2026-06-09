import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ message: 'Error fetching team' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(400).json({ message: 'Error creating team' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body as { name?: string; description?: string; members?: string[] };
    const update: { name?: string; description?: string; members?: string[] } = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (members !== undefined) update.members = members;
    const team = await Team.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(400).json({ message: 'Error updating team' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ message: 'Error deleting team' });
  }
});

export default router;
