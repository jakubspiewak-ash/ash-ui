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

export interface ApiExpenseAmount {
    net: number,
    gross: number,
    vat: number,
    currency: string
}

export interface ApiExpenseDateRange {
    start?: Date,
    end?: Date
}

export interface ApiExpense {
    id: string,
    amount: ApiExpenseAmount,
    name: string,
    isPrivate: boolean,
    date: ApiExpenseDateRange,
    mailConfig: ApiExpenseMailConfig | null;
}

export interface ApiExpenseSummary {
    amount: ApiExpenseAmount,
    date: ApiExpenseDateRange,
    currency: ApiExpenseAmount[]
}

export interface ApiExpenseGetResponse {
    expenses: ApiExpense[],
    summary: ApiExpenseSummary
}


export interface ApiExpenseRequest {
    name: string,
    amount: ApiExpenseAmount,
    isPrivate: boolean,
    date: ApiExpenseDateRange,
    mailConfig: ApiExpenseMailConfig | null;
}
