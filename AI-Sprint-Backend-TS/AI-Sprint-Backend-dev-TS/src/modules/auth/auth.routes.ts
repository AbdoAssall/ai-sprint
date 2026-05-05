import express from "express";
import signupRoutes from "./signup/signup.routes.js";
import signinRoutes from "./signin/signin.routes.js";
import googleRoutes from "./google/google.routes.js";
import githubRoutes from "./github/github.routes.js";
import userDataRoutes from "./UserData/UserData.routes.js";

const router = express.Router();

router.use("/signup", signupRoutes);
router.use("/signin", signinRoutes);
router.use("/google", googleRoutes);
router.use("/github", githubRoutes);
router.use("/valid-token", userDataRoutes);

export default router;
