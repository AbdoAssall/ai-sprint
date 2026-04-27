import api from './api';
import type { Project } from '../types/project.types';

// Mock data - REMOVE when backend is ready
const MOCK_PROJECTS: Project[] = [
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
];

const USE_MOCK = true; // Set to false when backend is ready

export const projectService = {
    // Get all projects
    async getProjects(): Promise<Project[]> {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_PROJECTS), 500);
            });
        }
        const response = await api.get<Project[]>('/projects');
        return response.data;
    },

    // Create new project
    async createProject(project: Omit<Project, 'id' | 'date'>): Promise<Project> {
        if (USE_MOCK) {
            const newProject: Project = {
                ...project,
                id: Date.now().toString(),
                date: new Date().toLocaleDateString('en-US', { year: '2-digit', month: 'short', day: 'numeric' }).replace(/\//g, ' '),
            };
            MOCK_PROJECTS.push(newProject);
            return new Promise((resolve) => {
                setTimeout(() => resolve(newProject), 300);
            });
        }
        const response = await api.post<Project>('/projects', project);
        return response.data;
    },

    // Get project by ID
    async getProjectById(id: string): Promise<Project> {
        if (USE_MOCK) {
            const project = MOCK_PROJECTS.find((p) => p.id === id);
            if (!project) throw new Error('Project not found');
            return new Promise((resolve) => {
                setTimeout(() => resolve(project), 300);
            });
        }
        const response = await api.get<Project>(`/projects/${id}`);
        return response.data;
    },

    // Update project
    async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
        if (USE_MOCK) {
            const index = MOCK_PROJECTS.findIndex((p) => p.id === id);
            if (index === -1) throw new Error('Project not found');
            MOCK_PROJECTS[index] = { ...MOCK_PROJECTS[index], ...updates };
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_PROJECTS[index]), 300);
            });
        }
        const response = await api.put<Project>(`/projects/${id}`, updates);
        return response.data;
    },

    // Delete project
    async deleteProject(id: string): Promise<void> {
        if (USE_MOCK) {
            const index = MOCK_PROJECTS.findIndex((p) => p.id === id);
            if (index !== -1) {
                MOCK_PROJECTS.splice(index, 1);
            }
            return new Promise((resolve) => {
                setTimeout(() => resolve(), 300);
            });
        }
        await api.delete(`/projects/${id}`);
    }
};
