import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '../../types/project.types';
import { fetchProjects } from './projectsActions';

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setLoading, setError } = projectsSlice.actions;
export default projectsSlice.reducer;
