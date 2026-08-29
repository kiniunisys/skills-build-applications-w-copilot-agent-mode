"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Team_1 = __importDefault(require("./models/Team"));
const User_1 = __importDefault(require("./models/User"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName ? `https://${codespaceName}-${PORT}.app.github.dev` : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api/users/', async (_req, res) => {
    res.json(await User_1.default.find().sort({ username: 1 }));
});
app.get('/api/teams/', async (_req, res) => {
    res.json(await Team_1.default.find().populate('members', 'username firstName lastName'));
});
app.get('/api/activities/', async (_req, res) => {
    res.json(await Activity_1.default.find().populate('user', 'username firstName lastName').sort({ completedAt: -1 }));
});
app.get('/api/leaderboard/', async (_req, res) => {
    res.json(await Leaderboard_1.default.find().populate('user', 'username firstName lastName').sort({ rank: 1 }));
});
app.get('/api/workouts/', async (_req, res) => {
    res.json(await Workout_1.default.find().sort({ difficulty: 1, name: 1 }));
});
app.use((error, _req, res, _next) => {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Unable to load data' });
});
async function startServer() {
    await (0, database_1.default)();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`OctoFit Tracker API running at ${API_BASE_URL}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
