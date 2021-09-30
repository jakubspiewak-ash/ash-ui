import axios, {AxiosResponse} from "axios";
import {API_ENDPOINT, ApiUserConfiguration, ApiUserCredentials} from "./api.types";

const USER_ENDPOINT = `${API_ENDPOINT}/user`;

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const saveUser = async (request: ApiUserCredentials): Promise<string> => {
    return axios.post<ApiUserCredentials, AxiosResponse<string>>(`${USER_ENDPOINT}/register`, request).then(r => r.data);
}

export const fetchUserConfiguration = async (): Promise<ApiUserConfiguration | undefined> => {
    return axios.get<any, AxiosResponse<ApiUserConfiguration[]>>(`${USER_ENDPOINT}/configuration`)
        .then(r => r.data && r.data[0] ? r.data[0] : undefined);
}

export const saveUserConfiguration = async (request: ApiUserConfiguration): Promise<string> => {
    return axios.put<ApiUserConfiguration, AxiosResponse<string>>(`${USER_ENDPOINT}/configuration`, request)
        .then(r => r.data);
}