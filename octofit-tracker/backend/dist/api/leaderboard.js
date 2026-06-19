"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find()
        .populate('userId', 'name email')
        .sort({ rank: 1 })
        .lean();
    res.status(200).json({ resource: 'leaderboard', items: leaderboard });
});
exports.default = router;
