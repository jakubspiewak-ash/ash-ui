export const API_ENDPOINT = "http://localhost:8080"

// export interface Api

export interface ApiUserConfiguration {
    mail?: ApiUserMailConfiguration;
}

export interface ApiUserMailConfiguration {
    address?: string,
    password?: string,
    host?: string,
    port?: number,
}

export interface ApiUserCredentials {
    login?: string,
    password?: string
}