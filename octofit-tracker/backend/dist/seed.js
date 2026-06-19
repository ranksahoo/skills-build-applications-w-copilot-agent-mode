"use strict";
/**
 * Test data seed description:
 * This file defines starter test data for local development and validation.
 * It includes representative records for users, teams, activities,
 * leaderboard entries, and workouts used by the OctoFit Tracker API.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
exports.seedData = {
    users: [
        { id: 'u1', name: 'Avery Kim', email: 'avery@example.com' },
        { id: 'u2', name: 'Jordan Lee', email: 'jordan@example.com' }
    ],
    teams: [
        { id: 't1', name: 'Octo Striders', memberIds: ['u1', 'u2'] }
    ],
    activities: [
        { id: 'a1', userId: 'u1', type: 'run', durationMinutes: 35 },
        { id: 'a2', userId: 'u2', type: 'cycle', durationMinutes: 50 }
    ],
    leaderboard: [
        { userId: 'u2', points: 120 },
        { userId: 'u1', points: 95 }
    ],
    workouts: [
        { id: 'w1', title: 'Core Builder', level: 'beginner' },
        { id: 'w2', title: 'Speed Intervals', level: 'intermediate' }
    ]
};
