import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './utils/swagger';
import basicAuth from './middlewares/basicAuth';

import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import gigRoutes from './routes/gigRoutes';
import userRoutes from './routes/userRoutes';
// import orderRoutes from './routes/'


dotenv.config();
const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/gig', gigRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/order', orderRoutes);

// Apply basic authentication middleware for Swagger UI
app.use('/api-docs/', basicAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Centralized error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });

export default app;
