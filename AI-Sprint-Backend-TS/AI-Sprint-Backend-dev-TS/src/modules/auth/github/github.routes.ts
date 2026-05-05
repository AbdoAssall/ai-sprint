import express from "express";
import passport from "passport";
import controller from "./github.controller.js";

const router = express.Router();
router.get(
    "/",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

router.get(
    "/callback",
    passport.authenticate("github", { session: false }),
    controller
);

export default router;
