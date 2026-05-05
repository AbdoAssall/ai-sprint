import express from "express";
import verfiyToken from "../../../utils/verfiyToken.js";
import { UserData } from "./UserData.controller.js";

const router = express.Router();
router.get("/", verfiyToken, UserData);

export default router;
