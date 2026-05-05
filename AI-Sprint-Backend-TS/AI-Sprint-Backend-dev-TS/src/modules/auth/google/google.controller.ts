import { Request, Response } from "express";
import generateToken from "../../../utils/generateToken.js";
import httpStatusText from "../../../utils/httpStatusText.js";

export default (req: Request, res: Response) => {
    const token = generateToken(req.user);

    res.json({
        status: httpStatusText.SUCCESS,
        data: req.user,
        token,
    });
};
