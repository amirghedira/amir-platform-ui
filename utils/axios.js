import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://mywebrestapi.herokuapp.com'
})

axiosInstance.interceptors.request.use(
    config => {
        let accessToken = null
        accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
export default axiosInstance

