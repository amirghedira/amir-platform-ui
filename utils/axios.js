import axios from 'axios'
const API_HOST = process.env.API_URL
const axiosInstance = axios.create({
    baseURL: API_HOST
})

axiosInstance.interceptors.request.use(
    config => {
        let accessToken = null
        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('token');
            if (accessToken)
                config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
export const API_URL = API_HOST
export default axiosInstance

