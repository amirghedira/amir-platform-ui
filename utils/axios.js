import axios from 'axios'
const production = true
const API_HOST = production ? 'https://api.amir-ghedira.com' : 'http://localhost:5000'
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

