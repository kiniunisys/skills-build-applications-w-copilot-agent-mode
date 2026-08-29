"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
async function startServer() {
    await (0, database_1.default)();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`OctoFit Tracker API running on port ${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
