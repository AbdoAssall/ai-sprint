import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    provider: string;
    providerId?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: String,
        provider: {
            type: String,
            default: "local",
        },
        providerId: String,
        avatar: String,
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
