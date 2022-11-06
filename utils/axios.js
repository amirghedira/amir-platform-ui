import axios from 'axios'
import getConfig from 'next/config'
import LocalStorageService from './localStorageService'
const { publicRuntimeConfig: config } = getConfig()
const API_HOST = config.API_URL
const axiosInstance = axios.create({
    baseURL: API_HOST
})

axiosInstance.interceptors.request.use(
    config => {
        let accessToken = null
        if (typeof window !== 'undefined') {
            accessToken = LocalStorageService.getAccessToken()
            if (accessToken)
                config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
axiosInstance.interceptors.response.use(
    async (response) => {
        return response
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) {
                LocalStorageService.clearToken();
                window.location.href = "/";
            } else {
                return Promise.reject(error)
            }

        } else {
            return Promise.reject(error)
        }

    }
);
export const API_URL = API_HOST
export default axiosInstance

