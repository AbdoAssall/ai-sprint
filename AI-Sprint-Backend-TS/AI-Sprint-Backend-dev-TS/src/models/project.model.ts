import mongoose, { Document } from "mongoose";

interface IProject extends Document {
    name: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    status: "active" | "completed" | "archived";
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "archived"],
        default: "active"
    }
}, {
    timestamps: true
});

export default mongoose.model<IProject>("Project", projectSchema);
