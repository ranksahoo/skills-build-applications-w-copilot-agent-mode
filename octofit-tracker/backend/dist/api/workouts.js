"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.Workout.find().populate('userId', 'name email').lean();
    res.status(200).json({ resource: 'workouts', items: workouts });
});
exports.default = router;
