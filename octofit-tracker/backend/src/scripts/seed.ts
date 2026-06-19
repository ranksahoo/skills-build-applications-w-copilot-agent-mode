import mongoose from 'mongoose';
import { connectToDatabase, mongoUri } from '../database';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
const runSeed = async () => {
  console.log('Seed the octofit_db database with test data');
  console.log(`Using MongoDB URI: ${mongoUri}`);

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Patel',
      email: 'maya.patel@octofit.dev',
      age: 29,
      fitnessLevel: 'intermediate',
      city: 'Seattle'
    },
    {
      name: 'Luis Romero',
      email: 'luis.romero@octofit.dev',
      age: 34,
      fitnessLevel: 'advanced',
      city: 'Austin'
    },
    {
      name: 'Nina Brooks',
      email: 'nina.brooks@octofit.dev',
      age: 26,
      fitnessLevel: 'beginner',
      city: 'Denver'
    }
  ]);

  await Team.insertMany([
    {
      name: 'Summit Striders',
      city: 'Seattle',
      memberIds: [users[0]._id, users[2]._id]
    },
    {
      name: 'Pace Makers',
      city: 'Austin',
      memberIds: [users[1]._id]
    }
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id,
      type: 'run',
      distanceKm: 7.4,
      durationMinutes: 42,
      caloriesBurned: 510,
      performedAt: new Date('2026-06-14T07:30:00.000Z')
    },
    {
      userId: users[1]._id,
      type: 'cycle',
      distanceKm: 24.6,
      durationMinutes: 61,
      caloriesBurned: 690,
      performedAt: new Date('2026-06-15T15:00:00.000Z')
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 180,
      performedAt: new Date('2026-06-16T18:45:00.000Z')
    }
  ]);

  await Leaderboard.insertMany([
    { userId: users[1]._id, points: 1680, rank: 1 },
    { userId: users[0]._id, points: 1525, rank: 2 },
    { userId: users[2]._id, points: 980, rank: 3 }
  ]);

  await Workout.insertMany([
    {
      userId: users[0]._id,
      title: 'Tempo Run + Core',
      category: 'cardio',
      targetMinutes: 50,
      difficulty: 'intermediate'
    },
    {
      userId: users[1]._id,
      title: 'Power Ladder Intervals',
      category: 'strength',
      targetMinutes: 45,
      difficulty: 'advanced'
    },
    {
      userId: users[2]._id,
      title: 'Mobility Flow Starter',
      category: 'mobility',
      targetMinutes: 30,
      difficulty: 'beginner'
    }
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, workouts inserted.');
};

runSeed()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  });
