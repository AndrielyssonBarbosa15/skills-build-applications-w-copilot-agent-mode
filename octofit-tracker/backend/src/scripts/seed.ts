/**
 * Seed the octofit_db database with test data
 *
 * Run with: npm run seed
 */
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to octofit_db');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  // Seed users
  const users = await User.insertMany([
    { username: 'octocat', email: 'octocat@mergington.edu', password: 'password123' },
    { username: 'paulocto', email: 'paul@mergington.edu', password: 'password123' },
    { username: 'jessicacat', email: 'jessica@mergington.edu', password: 'password123' },
    { username: 'studentone', email: 'student1@mergington.edu', password: 'password123' },
    { username: 'studenttwo', email: 'student2@mergington.edu', password: 'password123' },
  ]);
  console.log(`Seeded ${users.length} users`);

  // Seed teams
  const teams = await Team.insertMany([
    {
      name: 'Fitness Legends',
      description: 'Top performers at Mergington High',
      members: ['octocat', 'paulocto'],
    },
    {
      name: 'Running Stars',
      description: 'Dedicated runners',
      members: ['jessicacat', 'studentone'],
    },
    {
      name: 'Strength Squad',
      description: 'Strength training enthusiasts',
      members: ['studenttwo', 'octocat'],
    },
  ]);
  console.log(`Seeded ${teams.length} teams`);

  // Seed activities
  const activities = await Activity.insertMany([
    { userId: 'octocat', activityType: 'running', duration: 30, distance: 5, caloriesBurned: 300 },
    { userId: 'paulocto', activityType: 'walking', duration: 45, distance: 3, caloriesBurned: 150 },
    { userId: 'jessicacat', activityType: 'strength training', duration: 60, distance: 0, caloriesBurned: 400 },
    { userId: 'studentone', activityType: 'cycling', duration: 40, distance: 12, caloriesBurned: 350 },
    { userId: 'studenttwo', activityType: 'swimming', duration: 30, distance: 1.5, caloriesBurned: 280 },
  ]);
  console.log(`Seeded ${activities.length} activities`);

  // Seed leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { userId: 'octocat', username: 'octocat', totalPoints: 850, rank: 1 },
    { userId: 'jessicacat', username: 'jessicacat', totalPoints: 720, rank: 2 },
    { userId: 'paulocto', username: 'paulocto', totalPoints: 680, rank: 3 },
    { userId: 'studentone', username: 'studentone', totalPoints: 540, rank: 4 },
    { userId: 'studenttwo', username: 'studenttwo', totalPoints: 420, rank: 5 },
  ]);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);

  // Seed workouts
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Run',
      description: 'A refreshing morning run to start the day',
      difficulty: 'easy',
      duration: 30,
      exercises: ['warm-up stretch', '5k run', 'cool-down walk'],
    },
    {
      name: 'Full Body Strength',
      description: 'Complete strength training workout',
      difficulty: 'hard',
      duration: 60,
      exercises: ['squats', 'push-ups', 'deadlifts', 'pull-ups', 'planks'],
    },
    {
      name: 'Cardio Blast',
      description: 'High intensity cardio session',
      difficulty: 'medium',
      duration: 45,
      exercises: ['jumping jacks', 'burpees', 'mountain climbers', 'high knees'],
    },
    {
      name: 'Yoga Flow',
      description: 'Relaxing yoga session for flexibility',
      difficulty: 'easy',
      duration: 40,
      exercises: ['sun salutation', 'warrior poses', 'tree pose', 'child pose'],
    },
    {
      name: 'HIIT Training',
      description: 'High Intensity Interval Training',
      difficulty: 'hard',
      duration: 30,
      exercises: ['sprint intervals', 'box jumps', 'kettlebell swings', 'battle ropes'],
    },
  ]);
  console.log(`Seeded ${workouts.length} workouts`);

  console.log('Database seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
