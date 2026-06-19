"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await user_1.User.find().lean();
    res.status(200).json({ resource: 'users', items: users });
});
exports.default = router;
