import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import httpStatusText from "../utils/httpStatusText.js";

const validateObjectId = (paramName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[paramName];

        if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Invalid ID format",
            });
        }

        next();
    };
};

export default validateObjectId;
