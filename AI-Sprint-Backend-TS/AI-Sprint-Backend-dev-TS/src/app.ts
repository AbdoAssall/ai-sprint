import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import authRoutes from "./modules/auth/auth.routes.js";
import protectedRoutes from './routes/protected.routes.js';
import verfiyToken from "./utils/verfiyToken.js";
import "./config/passport.js";

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(passport.initialize());

// Disable caching for API responses
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", verfiyToken, protectedRoutes);

export default app;
