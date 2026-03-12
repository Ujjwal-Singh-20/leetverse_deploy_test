import axios from 'axios';
import { auth } from '../lib/firebase';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_BACKEND_URL || 'http://localhost:8000',
});

// Interceptor to add Firebase ID Token to requests
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginUser = () => api.post('/login');
export const getMyProfile = () => api.get('/me');
export const getUserProfile = () => api.get('/profile');
export const getTop10Leaderboard = (rollNo) => api.get('/leaderboard/top10', { params: { rollNo } });
export const getFullLeaderboard = () => api.get('/leaderboard/full');
export const getDailyLeaderboard = (date) => api.get(`/leaderboard/${date}`);
export const getUserHistory = (rollNo) => api.get(`/user/${rollNo}/history`);
export const uploadExcel = (formData, date) => api.post('/upload-excel', formData, {
    params: { score_date: date },
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const getUploadStatus = (date) => api.get('/upload-status', { params: { score_date: date } });

export const getDirectTop10 = async () => {
    const fetchUrl = import.meta.env.VITE_LEADERBOARD_TOP10_URL;
    if (!fetchUrl) {
        console.warn('VITE_LEADERBOARD_TOP10_URL not set');
        return null;
    }
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data?.value || (Array.isArray(data) ? data : null);
    } catch (error) {
        console.error('Direct edge fetch failed:', error);
        return null;
    }
};

export const checkHealth = async () => {
    try {
        const response = await api.get('/');
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export default api;
