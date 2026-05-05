import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as GithubStrategy, Profile as GithubProfile } from "passport-github2";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK!,
        },
        async (_: string, __: string, profile: GoogleProfile, done: VerifyCallback) => {
            try {
                let user = await User.findOne({ providerId: profile.id });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value,
                        provider: "google",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: process.env.GITHUB_CALLBACK!,
        },
        async (accessToken: string, refreshToken: string, profile: GithubProfile, done: VerifyCallback) => {
            try {
                let user = await User.findOne({ providerId: profile.id });

                if (!user) {
                    user = await User.create({
                        name: profile.username,
                        provider: "github",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);
