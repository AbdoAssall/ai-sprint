import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Project } from '../../types/project.types';

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<{ status: string; data: Project[] }>('/api/v1/projects');
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch projects'
            );
        }
    }
);
