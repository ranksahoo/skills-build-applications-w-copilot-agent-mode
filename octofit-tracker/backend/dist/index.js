"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const activities_1 = __importDefault(require("./api/activities"));
const leaderboard_1 = __importDefault(require("./api/leaderboard"));
const teams_1 = __importDefault(require("./api/teams"));
const users_1 = __importDefault(require("./api/users"));
const workouts_1 = __importDefault(require("./api/workouts"));
const database_1 = require("./database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
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
        await (0, database_1.connectToDatabase)();
        console.log(`MongoDB connected: ${database_1.mongoUri}`);
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
