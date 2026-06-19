"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.Team.find().populate('memberIds', 'name email').lean();
    res.status(200).json({ resource: 'teams', items: teams });
});
exports.default = router;
