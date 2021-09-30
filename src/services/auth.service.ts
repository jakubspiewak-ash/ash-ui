import {API_ENDPOINT, ApiUserCredentials} from "./api.types";
import axios, {AxiosResponse} from "axios";

const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;
const TOKEN_STORAGE_KEY = "user_token";

export const getApiToken = async (request: ApiUserCredentials): Promise<string> => {
    return axios.post<ApiUserCredentials, AxiosResponse<string>>(AUTH_ENDPOINT, request).then(r => r.data);
}

export const getStorageToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);
export const setStorageToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const clearStorageToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);