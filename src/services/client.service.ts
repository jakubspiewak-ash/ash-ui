import axios, { AxiosError, AxiosResponse } from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';
export const ApiClient = axios.create({
    baseURL: API_ENDPOINT,
});

const handleResponse = (response: AxiosResponse) => {
    return response?.data;
};
const handleRejection = (error: AxiosError): any => Promise.reject(error);

ApiClient.interceptors.response.use(handleResponse, handleRejection);
ApiClient.defaults.headers.post['Content-Type'] = 'application/json';