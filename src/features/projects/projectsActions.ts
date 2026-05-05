import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FormGenerateProjectDetails,
  EditProjectPayload,
} from "../../types/project.types";
import * as projectsService from "../../services/projectService";
import api from "../../services/api";
import type { Project } from "../../types/project.types";

export const generateProject = createAsyncThunk(
  "project/generate",
  async (projectData: FormGenerateProjectDetails, { rejectWithValue }) => {
    try {
      const { status, data, message } =
        await projectsService.aiGenerateProjectTasks(projectData);

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Generating project tasks is failed");
      }
      return data;
    } catch (error: any) {
      // Check console log Here
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong while generating tasks",
      );
    }
  },
);

export const editProject = createAsyncThunk(
  "project/edit",
  async (
    { projectId, projectData }: EditProjectPayload,
    { rejectWithValue },
  ) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      const { status, data, message } = await projectsService.editProject(
        projectId,
        projectData,
      );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Editing project is failed");
      }
      return data;
    } catch (error: any) {
      // Check console log Here
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong while editing project",
      );
    }
  },
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<{ status: string; data: Project[] }>(
        "/api/v1/projects",
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);
