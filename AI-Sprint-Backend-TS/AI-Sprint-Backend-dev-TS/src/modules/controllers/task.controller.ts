import { Request, Response } from "express";
import httpStatusText from "../../utils/httpStatusText.js";
import Task from "../../models/task.model.js";
import Project from "../../models/project.model.js";

export const AddNewTask = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;
        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }
        const newTask = new Task({ title, description, projectId });

        await newTask.save();

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task  added successfully",
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const GetAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const UpdateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task  updated successfully",
            data: updatedTask
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};

export const DeleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Task not found"
            });
        }
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error instanceof Error ? error.message : "Internal server error"
        });
    }
};
