import api from './api';
import type { RegisterCredentials, AuthResponse, LoginCredentials } from '../types/user.types';

interface BackendAuthResponse {
    status: string;
    token?: string;
    data: any;
}

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>('/api/v1/auth/signup', credentials);
    return {
        ...response.data.data,
        token: response.data.token,
        accessToken: response.data.token
    };
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<BackendAuthResponse>('/api/v1/auth/signin', credentials);
    return {
        ...response.data.data,
        token: response.data.token,
        accessToken: response.data.token
    };
};