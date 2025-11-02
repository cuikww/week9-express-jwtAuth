import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api', apiRouter);
app.use(errorHandler);

export default app;
