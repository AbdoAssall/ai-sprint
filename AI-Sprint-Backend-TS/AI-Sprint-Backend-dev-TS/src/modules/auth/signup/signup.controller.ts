import { Request, Response } from "express";
import User from "../../../models/user.model.js";
import { hash } from "../../../utils/hashPassword.js";
import generateToken from "../../../utils/generateToken.js";
import httpStatusText from "../../../utils/httpStatusText.js";

interface SignupData {
    name: string;
    email: string;
    password: string;
}

const service = async (data: SignupData) => {
    if (!data.name || !data.email || !data.password) {
        throw new Error("All fields required");
    }

    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error("User exists");

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: await hash(data.password),
    });

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

export default async (req: Request, res: Response) => {
    try {
        const result = await service(req.body);
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            token: result.token,
            data: result.user
        });
    } catch (err) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            message: err instanceof Error ? err.message : "An error occurred",
            data: null
        });
    }
};
