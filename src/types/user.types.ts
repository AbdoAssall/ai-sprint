export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Optional for security reasons
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token?: string;
    accessToken?: string;
}