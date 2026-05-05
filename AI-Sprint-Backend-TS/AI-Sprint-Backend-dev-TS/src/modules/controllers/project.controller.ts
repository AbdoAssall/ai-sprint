import { Request, Response } from "express";
import { generateTask } from "../../services/aiService.js";
import httpStatusText from "../../utils/httpStatusText.js";
import Project from "../../models/project.model.js";
import Task from "../../models/task.model.js";

export const CreateProjectWithGeneratedTasks = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            status: httpStatusText.FAIL,
            message: "Unauthorized"
        });
    }
    const user = req.user as { id: string; email: string };
    const userId = user.id;
    const { projectName, description } = req.body;

    try {
        if (!projectName || !description) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Missing fields",
            });
        }

        const generatedTasks = await generateTask(projectName, description);

        const project = await Project.create({
            name: projectName,
            description,
            createdBy: userId
        });

        if (generatedTasks && generatedTasks.success) {
            interface GeneratedTask {
                title: string;
                description: string;
                priority: string;
                state: string;
                phase: string;
            }
            const tasksToInsert = generatedTasks.tasks.map((task: GeneratedTask) => ({
                projectId: project._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                state: task.state,
                phase: task.phase
            }));

            await Task.insertMany(tasksToInsert);
        }

        return res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: {
                id: project._id,
                ...generatedTasks
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const GetAllProjects = async (req: Request, res: Response) => {
    const user = req.user as { id: string; email: string };
    const userId = user.id;

    try {
        const projects = await Project.find({ createdBy: userId });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: projects
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const GetProjectDetails = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const user = req.user as { id: string; email: string };
    const userId = user.id;

    try {
        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        const tasks = await Task.find({ projectId });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                project,
                tasks
            }
        });

    } catch (error: unknown) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const UpdateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user as { id: string; email: string };
    const userId = user.id;
    const { name, description } = req.body;

    try {
        if (!name && !description) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Missing fields"
            });
        }
        const project = await Project.findOneAndUpdate(
            { _id: id, createdBy: userId },
            req.body,
            { returnDocument: 'after' }
        );

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Project updated successfully",
            data: project
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const DeleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as { id: string; email: string };
    const userId = user.id;
    try {
        const project = await Project.findOneAndDelete({
            _id: id,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        await Task.deleteMany({ projectId: id });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Project and related tasks deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};
