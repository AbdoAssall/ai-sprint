import express from "express";
import passport from "passport";
import controller from "./google.controller.js";

const router = express.Router();
router.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/callback",
    passport.authenticate("google", { session: false }),
    controller
);

export default router;
