"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./utils/swagger");
const basicAuth_1 = __importDefault(require("./middlewares/basicAuth"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const gigRoutes_1 = __importDefault(require("./routes/gigRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const stateRoutes_1 = __importDefault(require("./routes/stateRoutes"));
// import orderRoutes from './routes/'
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Enable CORS
app.use((0, cors_1.default)());
// Body parsing middleware
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/service', serviceRoutes_1.default);
app.use('/api/gig', gigRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api', stateRoutes_1.default);
// app.use('/api/order', orderRoutes);
// Apply basic authentication middleware for Swagger UI
app.use('/api-docs/', basicAuth_1.default, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocs));
// Centralized error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });
exports.default = app;
