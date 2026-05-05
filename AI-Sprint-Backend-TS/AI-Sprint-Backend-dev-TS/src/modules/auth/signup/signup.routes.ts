import express from "express";
import validate from "../../../middleware/validation.middleware.js";
import controller from "./signup.controller.js";
import schema from "./signup.validation.js";

const router = express.Router();
router.post("/", validate(schema), controller);

export default router;
