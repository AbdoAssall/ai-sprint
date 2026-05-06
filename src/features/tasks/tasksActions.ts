import { createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../../services/taskService";
import type { AddTaskPayload, EditTaskPayload } from "../../types/task.types";

export const addingTask = createAsyncThunk(
  "project/addingTask",
  async ({ projectId, taskData }: AddTaskPayload, { rejectWithValue }) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      const { status, data, message } = await taskService.addingTask(
        projectId,
        taskData,
      );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Adding new task is failed");
      }
      return data;
    } catch (error: any) {
      // Check console log Here
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong while adding task",
      );
    }
  },
);

export const editingTask = createAsyncThunk(
  "project/editingTask",
  async (
    { projectId, taskId, taskData }: EditTaskPayload,
    { rejectWithValue },
  ) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      if (!taskId) return rejectWithValue("Task ID is not correct");
      const { status, data, message } = await taskService.editingTask(
        taskId,
        taskData,
      );

      // const { status, data, message } = await taskService.editingTask(
      //   projectId,
      //   taskId,
      //   taskData,
      // );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Editig task is failed");
      }
      return data;
    } catch (error: any) {
      // Check console log Here
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong while editing task",
      );
    }
  },
);
