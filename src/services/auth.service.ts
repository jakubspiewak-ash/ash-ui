import { ApiUserCredentials } from './api.types';
import { ApiClient } from './client.service';

const AUTH_ENDPOINT = '/auth';
const TOKEN_STORAGE_KEY = 'user_token';

export const getApiToken = async (request: ApiUserCredentials): Promise<string> => ApiClient.post<ApiUserCredentials, string>(AUTH_ENDPOINT, request);

export const updateAuthorizationHeader = (token: string) => ApiClient.defaults.headers.Authorization = token;

// store.subscribe(() => {
//     const state = store.getState();
//     const { token } = state?.auth;
//     if (token) {
//         updateAuthorizationHeader(token);
//     }
// });

export const getStorageToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);
export const setStorageToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const clearStorageToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);
