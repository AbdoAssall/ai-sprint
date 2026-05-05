import { Request, Response } from "express";
import User from "../../../models/user.model.js";
import httpStatusText from "../../../utils/httpStatusText.js";

export const UserData = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            status: httpStatusText.FAIL,
            message: "Unauthorized"
        });
    }
    const user = req.user as { id: string; email: string };
    const email = user.email;
    try {
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "this user is not found!"
            });
        }
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: user
        });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "An error occurred",
            data: {}
        });
    }
};
