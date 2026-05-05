import express from "express";
import validate from "../../../middleware/validation.middleware.js";
import { SignIn } from "./signin.controller.js";
import schema from "./signin.validation.js";

const router = express.Router();
router.post("/", validate(schema), SignIn);

export default router;
