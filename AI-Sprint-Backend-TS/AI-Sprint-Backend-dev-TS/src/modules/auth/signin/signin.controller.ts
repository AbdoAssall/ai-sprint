import { Request, Response } from "express";
import User from "../../../models/user.model.js";
import generateToken from "../../../utils/generateToken.js";
import httpStatusText from "../../../utils/httpStatusText.js";
import { compare } from "../../../utils/hashPassword.js";

export const SignIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "this email is not found!"
            });
        }

        const matchedPassword = await compare(password, user.password || "");

        if (!matchedPassword) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "invalid password"
            });
        }

        const token = generateToken(user);

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            token: token,
            data: userData
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
