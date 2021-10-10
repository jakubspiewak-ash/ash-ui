import { ApiClient } from './client.service';
import { ApiExpenseRequest, ApiExpenseResponse } from './api.types';

const EXPENSE_ENDPOINT = '/expense';

export const fetchExpenses = (): Promise<ApiExpenseResponse[]> => ApiClient.get<unknown, ApiExpenseResponse[]>(EXPENSE_ENDPOINT);
export const saveExpenses = (request: ApiExpenseRequest): Promise<void> => ApiClient.post<ApiExpenseRequest, void>(EXPENSE_ENDPOINT, request);
export const updateExpense = (id: string, request: ApiExpenseRequest): Promise<void> => ApiClient.put<ApiExpenseRequest, void>(`${EXPENSE_ENDPOINT}/${id}`, request);
export const deleteExpense = (id: string): Promise<void> => ApiClient.delete(`${EXPENSE_ENDPOINT}/${id}`);
