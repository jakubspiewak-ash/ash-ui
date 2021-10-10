export interface ApiUserConfiguration {
    mail: ApiUserMailConfiguration;
}

export interface ApiUserMailConfiguration {
    address: string,
    password: string,
    host: string,
    port: number,
}

export interface ApiUserCredentials {
    login: string,
    password: string
}

export interface ApiExpenseMailConfig {
    mailAddress: string,
    attachmentPattern: string;
}

export interface ApiExpenseResponse {
    id: string,
    amount: number,
    name: string,
    mailConfig: ApiExpenseMailConfig | null;
}

export interface ApiExpenseRequest {
    amount: number,
    name: string,
    mailConfig: ApiExpenseMailConfig | null;
}
