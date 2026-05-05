import mongoose, { Document } from "mongoose";

interface ITask extends Document {
    projectId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    state: "backlog" | "in_progress" | "review" | "completed";
    phase: "planning" | "design" | "development" | "testing" | "deployment" | "Other";
    assignedTo?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    state: {
        type: String,
        enum: ["backlog", "in_progress", "review", "completed"],
        default: "backlog"
    },
    phase: {
        type: String,
        enum: ["planning", "design", "development", "testing", "deployment", "Other"],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model<ITask>("Task", taskSchema);
