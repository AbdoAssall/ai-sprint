import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatusText from '../utils/httpStatusText.js';

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ status: httpStatusText.FAIL, message: "Authentication token is required.", data: null });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ status: httpStatusText.FAIL, message: error instanceof Error ? error.message : "Invalid token", data: null });
    }
};
