import jwt from "jsonwebtoken";

export default (user: any) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );
};
