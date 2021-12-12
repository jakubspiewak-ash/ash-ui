import axios, { AxiosError, AxiosResponse } from 'axios';

// import { store } from '../redux/Store';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';
export const ApiClient = axios.create({
    baseURL: API_ENDPOINT,
});

// const isoDateFormat = /^\d{4}-\d{2}-\d{2}$/;
//
// function isIsoDateString(value: any): boolean {
//     return value && typeof value === 'string' && isoDateFormat.test(value);
// }
//
// export function handleDates(body: any) {
//     if (body === null || body === undefined || typeof body !== 'object') {
//         return body;
//     }
//
//     for (const key of Object.keys(body)) {
//         const value = body[key];
//
//         if (isIsoDateString(value)) {
//             body[key] = new Date(value);
//         } else if (typeof value === 'object') {
//             handleDates(value);
//         }
//     }
// }

const handleResponse = (response: AxiosResponse) => {
    // handleDates(response?.data);
    return response?.data;
};
const handleRejection = (error: AxiosError): any => Promise.reject(error);

ApiClient.interceptors.response.use(handleResponse, handleRejection);
ApiClient.defaults.headers.post['Content-Type'] = 'application/json';

// ApiClient.interceptors.request.use((config) => {
//     config.headers = config.headers || {};
// config.headers.Authorization = store.getState().auth.token;
// eslint-disable-next-line no-console
// console.log(store.getState());
// return config;
// });
