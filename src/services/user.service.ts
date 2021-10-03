import {API_ENDPOINT, ApiUserConfiguration, ApiUserCredentials} from "./api.types";
import {ApiClient} from "./client.service";

const USER_ENDPOINT = `${API_ENDPOINT}/user`;

export const saveUser = async (request: ApiUserCredentials): Promise<string | undefined> => {
    return ApiClient.post<ApiUserCredentials, string>(`${USER_ENDPOINT}/register`, request)
}

export const fetchUserConfiguration = async (): Promise<ApiUserConfiguration | undefined> => {
    return ApiClient.get<any, ApiUserConfiguration>(`${USER_ENDPOINT}/configuration`)
}

export const saveUserConfiguration = async (request: ApiUserConfiguration): Promise<string | undefined> => {
    return ApiClient.put<ApiUserConfiguration, string>(`${USER_ENDPOINT}/configuration`, request)
}