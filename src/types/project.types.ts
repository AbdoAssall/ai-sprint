export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON-HOLD';

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    progress: number;
    icon: string;
    iconBgColor: string;
    teamMembers: number;
    taskCount: number;
    date: string;
}
