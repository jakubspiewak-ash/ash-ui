import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Omit } from 'framer-motion/types/types';

import { ApiExpenseAmount, ApiExpenseGetResponse, ApiExpenseRequest } from '../../services/api.types';
import { deleteApiExpense, fetchExpenses, saveApiExpenses, updateApiExpense } from '../../services/expense.service';
import { getCurrentMonth } from '../../utils/time';
import { YearMonth } from '../../utils/types';
import { ApiStatus, AppThunkApi } from '../types';

export type FormAmount = Omit<ApiExpenseAmount, 'net' | 'gross'> & { net?: number, gross?: number }
export type ExpenseFormType = Omit<ApiExpenseRequest, 'amount'> & { amount: FormAmount, id?: string };


interface ExpenseState {
    table: {
        data: ApiExpenseGetResponse,
        status: ApiStatus,
        currentInfo: string | null,
    }
    month: YearMonth,
    modal: {
        isOpen: boolean,
        initialFormValue: ExpenseFormType,
        mode: 'ADD' | 'EDIT',
        status: ApiStatus
    }
}

const emptyFormValue: ExpenseFormType = {
    amount: {
        currency: 'PLN',
        gross: undefined,
        net: undefined,
        vat: 23,
    },
    date: {
        end: undefined,
        start: undefined,
    },
    isPrivate: false,
    mailConfig: null,
    name: '',
};

export const initialState: ExpenseState = {
    modal: {
        initialFormValue: emptyFormValue,
        isOpen: false,
        mode: 'ADD',
        status: 'IDLE',
    },
    month: getCurrentMonth(),
    table: {
        currentInfo: null,
        data: {
            expenses: [],
            summary: {
                amount: {
                    currency: '',
                    gross: 0,
                    net: 0,
                    vat: 0,
                },
                currency: [],
                date: {},
            },
        },
        status: 'IDLE',
    },
};

export const loadExpenses = createAsyncThunk<ApiExpenseGetResponse, YearMonth | undefined, AppThunkApi>(
    'expense/load',
    async (month, { getState }) => {
        return fetchExpenses(month || getState().expense.month);
    },
);

export const saveExpense = createAsyncThunk<Promise<void>, ExpenseFormType, AppThunkApi>(
    'expense/save',
    async (expense, thunkAPI) => {
        const { mode } = thunkAPI.getState().expense.modal;

        if (mode === 'ADD') {
            return saveApiExpenses(expense as ApiExpenseRequest);
        } else {
            return updateApiExpense(expense.id as string, expense as ApiExpenseRequest);
        }
    },
);

export const deleteExpense = createAsyncThunk<Promise<void>, string, AppThunkApi>(
    'expense/delete',
    async (id) => {
        return deleteApiExpense(id);
    },
);

const ExpenseSlice = createSlice({
    extraReducers(builder) {
        builder
            .addCase(loadExpenses.pending, (state) => {
                state.table.status = 'LOADING';
            })
            .addCase(loadExpenses.fulfilled, (state, action) => {
                state.table.status = 'SUCCESS';
                state.month = action.meta.arg || state.month;
                state.table.data = action.payload;
            })
            .addCase(loadExpenses.rejected, (state) => {
                state.table.status = 'FAILED';
            })
            .addCase(saveExpense.pending, (state) => {
                state.modal.status = 'LOADING';
            })
            .addCase(saveExpense.fulfilled, (state) => {
                state.modal.isOpen = false;
                state.modal.status = 'SUCCESS';
            })
            .addCase(saveExpense.rejected, (state) => {
                state.modal.status = 'FAILED';
            })
            .addCase(deleteExpense.pending, (state) => {
                state.table.status = 'LOADING';
            })
            .addCase(deleteExpense.fulfilled, (state) => {
                state.table.status = 'SUCCESS';
            })
            .addCase(deleteExpense.rejected, (state) => {
                state.table.status = 'FAILED';
            });
    },
    initialState,
    name: 'expense',
    reducers: {
        closeModal: (state) => {
            state.modal.isOpen = false;
        },
        openModal: (state, action: PayloadAction<ExpenseFormType | undefined>) => {
            state.modal.isOpen = true;
            if (action.payload) {
                state.modal.initialFormValue = action.payload;
                state.modal.mode = 'EDIT';
            } else {
                state.modal.initialFormValue = emptyFormValue;
                state.modal.mode = 'ADD';
            }
        },
        reset: () => initialState,
        toggleInfo: (state, action: PayloadAction<string>) => {
            state.table.currentInfo = state.table.currentInfo === action.payload ? null : action.payload;
        },
    },
});

export const { openModal, closeModal, toggleInfo, reset } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;