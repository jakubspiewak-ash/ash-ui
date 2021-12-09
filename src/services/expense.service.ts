import { ApiExpenseGetResponse, ApiExpenseRequest } from './api.types';
import { ApiClient } from './client.service';

const EXPENSE_ENDPOINT = '/expense';

export const fetchExpenses = ({
                                  year,
                                  month,
                              }: { year: number, month: number }): Promise<ApiExpenseGetResponse> => ApiClient.get<unknown, ApiExpenseGetResponse>(`${EXPENSE_ENDPOINT}?month=${year}-${month < 10 ? `0${month}` : month}`);
export const saveExpenses = (request: ApiExpenseRequest): Promise<void> => ApiClient.post<ApiExpenseRequest, void>(EXPENSE_ENDPOINT, request);
export const updateExpense = (id: string, request: ApiExpenseRequest): Promise<void> => ApiClient.put<ApiExpenseRequest, void>(`${EXPENSE_ENDPOINT}/${id}`, request);
export const deleteExpense = (id: string): Promise<void> => ApiClient.delete(`${EXPENSE_ENDPOINT}/${id}`);
