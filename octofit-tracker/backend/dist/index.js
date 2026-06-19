"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activities_1 = __importDefault(require("./api/activities"));
const leaderboard_1 = __importDefault(require("./api/leaderboard"));
const teams_1 = __importDefault(require("./api/teams"));
const users_1 = __importDefault(require("./api/users"));
const workouts_1 = __importDefault(require("./api/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', baseUrl });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected: ${mongoUri}`);
        console.log(`API base URL: ${baseUrl}`);
        app.listen(port, () => {
            console.log(`API server listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend service:', error);
        process.exit(1);
    }
};
void startServer();
