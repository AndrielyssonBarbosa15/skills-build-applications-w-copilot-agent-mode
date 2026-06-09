import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    const { password: _pw, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body as { username?: string; email?: string };
    const update: { username?: string; email?: string } = {};
    if (username !== undefined) update.username = username;
    if (email !== undefined) update.email = email;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
