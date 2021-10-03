import axios, {AxiosError, AxiosResponse} from "axios";


export const ApiClient = axios.create()

const handleResponse = <T extends unknown>(response: AxiosResponse<T>): T | undefined => {
    return response?.data;
};

const handleRejection = (error: AxiosError): any => {
    return Promise.reject(error)
};

ApiClient.interceptors.response.use(handleResponse, handleRejection);
ApiClient.defaults.headers.post['Content-Type'] = 'application/json';