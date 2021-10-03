import {API_ENDPOINT, ApiUserCredentials} from "./api.types";
import {ApiClient} from "./client.service";

const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;
const TOKEN_STORAGE_KEY = "user_token";

export const getApiToken = async (request: ApiUserCredentials): Promise<string> => {
    return ApiClient.post<ApiUserCredentials, string>(AUTH_ENDPOINT, request);
}

export const getStorageToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);
export const setStorageToken = (token: string) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const clearStorageToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);