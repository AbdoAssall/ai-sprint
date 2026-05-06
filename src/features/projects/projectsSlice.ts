import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateProject, editProject, fetchProjects } from "./projectsActions";
import type { Project, ProjectDetails } from "../../types/project.types";

interface ProjectsState {
  projects: Project[];
  projectData: ProjectDetails | null;

  // loading states
  isFetching: boolean;
  isGenerating: boolean;
  isEditing: boolean;

  // success states
  isGeneratingSuccess: boolean;
  isEditingSuccess: boolean;

  //errors
  fetchErrorMsg: string | null;
  generateErrorMsg: string | null;
  editErrorMsg: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  projectData: null,

  // loading states
  isFetching: false,
  isGenerating: false,
  isEditing: false,

  // success states
  isGeneratingSuccess: false,
  isEditingSuccess: false,

  // errors
  fetchErrorMsg: null,
  generateErrorMsg: null,
  editErrorMsg: null,
};

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.fetchErrorMsg = action.payload;
    },
    resetGenerateProjectState: (state) => {
      state.projectData = null;
      state.isGenerating = false;
      state.isGeneratingSuccess = false;
      state.generateErrorMsg = null;
    },
    resetEditProjectState: (state) => {
      state.projectData = null;
      state.isEditing = false;
      state.isEditingSuccess = false;
      state.editErrorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isFetching = true;
        state.fetchErrorMsg = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isFetching = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchErrorMsg = action.payload as string;
      })
      .addCase(generateProject.pending, (state) => {
        state.isGenerating = true;
        state.generateErrorMsg = null;
      })
      .addCase(generateProject.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.isGeneratingSuccess = true;
        state.projectData = action.payload;
      })
      .addCase(generateProject.rejected, (state, action) => {
        state.isGenerating = false;
        state.generateErrorMsg = action.payload as string;
      })
      .addCase(editProject.pending, (state) => {
        state.isEditing = true;
        state.editErrorMsg = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.isEditing = false;
        state.isEditingSuccess = true;
        state.projectData = action.payload;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.isEditing = false;
        state.editErrorMsg = action.payload as string;
      });
  },
});

export const {
  setLoading,
  setError,
  resetGenerateProjectState,
  resetEditProjectState,
} = projectsSlice.actions;
export default projectsSlice.reducer;
