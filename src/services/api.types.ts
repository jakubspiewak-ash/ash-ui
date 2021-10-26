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

export interface Amount {
    net: number,
    gross: number,
    vat: number,
    currency: string
}

export interface DateRange {
    start?: Date,
    end?: Date
}

export interface ApiExpenseResponse {
    id: string,
    amount: Amount,
    name: string,
    isPrivate: boolean,
    date: DateRange,
    mailConfig: ApiExpenseMailConfig | null;
}

export interface ApiExpenseRequest {
    name: string,
    amount: Amount,
    isPrivate: boolean,
    date: DateRange,
    mailConfig: ApiExpenseMailConfig | null;
}
