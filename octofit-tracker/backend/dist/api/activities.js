"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.Activity.find().populate('userId', 'name email').lean();
    res.status(200).json({ resource: 'activities', items: activities });
});
exports.default = router;
