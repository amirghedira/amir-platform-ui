import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()
const API_HOST = config.API_URL
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

