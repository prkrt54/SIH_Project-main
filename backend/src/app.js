import express from "express";
import aiRoutes from './routes/ai.routes.js';

const app = express();
app.use(express.json());

app.use('/api/', aiRoutes);


export default app;