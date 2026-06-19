"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
/**
 * Seed the octofit_db database with test data
 */
const runSeed = async () => {
    console.log('Seed the octofit_db database with test data');
    console.log(`Using MongoDB URI: ${database_1.mongoUri}`);
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({})
    ]);
    const users = await user_1.User.insertMany([
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
    await team_1.Team.insertMany([
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
    await activity_1.Activity.insertMany([
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
    await leaderboard_1.Leaderboard.insertMany([
        { userId: users[1]._id, points: 1680, rank: 1 },
        { userId: users[0]._id, points: 1525, rank: 2 },
        { userId: users[2]._id, points: 980, rank: 3 }
    ]);
    await workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
    process.exit(0);
})
    .catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
