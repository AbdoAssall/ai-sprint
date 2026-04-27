import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '../../types/project.types';

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [
        {
            id: '1',
            name: 'Mobile App Redesign',
            description: 'Redesign the mobile application with modern UI/UX principles and improved user flow.',
            status: 'ACTIVE',
            progress: 65,
            icon: '📱',
            iconBgColor: 'bg-purple-500',
            teamMembers: 5,
            taskCount: 15,
            date: 'Mar 15'
        },
        {
            id: '2',
            name: 'Customer Portal v2',
            description: 'Build a new customer portal with self-service features and analytics dashboard.',
            status: 'ACTIVE',
            progress: 42,
            icon: '🔧',
            iconBgColor: 'bg-orange-500',
            teamMembers: 5,
            taskCount: 2,
            date: 'Apr 02'
        },
        {
            id: '3',
            name: 'Marketing Website',
            description: 'Create a modern marketing website with interactive elements and SEO optimization.',
            status: 'COMPLETED',
            progress: 100,
            icon: '💼',
            iconBgColor: 'bg-blue-500',
            teamMembers: 4,
            taskCount: 28,
            date: 'Feb 28'
        },
        {
            id: '4',
            name: 'API Migration',
            description: 'Migrate legacy REST API to GraphQL with improved performance and documentation.',
            status: 'ON-HOLD',
            progress: 28,
            icon: '⚙️',
            iconBgColor: 'bg-orange-400',
            teamMembers: 3,
            taskCount: 10,
            date: 'May 10'
        },
        {
            id: '5',
            name: 'Analytics Dashboard',
            description: 'Build comprehensive analytics dashboard with real-time data visualization.',
            status: 'ACTIVE',
            progress: 73,
            icon: '📊',
            iconBgColor: 'bg-purple-600',
            teamMembers: 6,
            taskCount: 23,
            date: 'Mar 28'
        },
        {
            id: '6',
            name: 'Mobile Backend API',
            description: 'Develop scalable backend API for mobile applications with authentication.',
            status: 'ACTIVE',
            progress: 55,
            icon: '🚀',
            iconBgColor: 'bg-green-500',
            teamMembers: 7,
            taskCount: 18,
            date: 'Apr 18'
        }
    ],
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
    }
});

export const { setLoading, setError } = projectsSlice.actions;
export default projectsSlice.reducer;
