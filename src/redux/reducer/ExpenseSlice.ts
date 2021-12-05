import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Omit } from 'framer-motion/types/types';

import { ApiExpenseAmount, ApiExpenseGetResponse, ApiExpenseRequest } from '../../services/api.types';
import { fetchExpenses } from '../../services/expense.service';
import { getCurrentMonth } from '../../utils/time';
import { YearMonth } from '../../utils/types';
import { ApiStatus, AppThunkApi } from '../types';

export type FormAmount = Omit<ApiExpenseAmount, 'net' | 'gross'> & { net?: number, gross?: number }
export type ExpenseFormType = Omit<ApiExpenseRequest, 'amount'> & { amount: FormAmount, id?: string };

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


interface ExpenseState {
    status: ApiStatus,
    data: ApiExpenseGetResponse,
    month: YearMonth,
    modal: {
        isOpen: boolean,
        initialFormValue: ExpenseFormType,
        mode: 'ADD' | 'EDIT'
    }
}

const initialState: ExpenseState = {
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
    modal: {
        initialFormValue: emptyFormValue,
        isOpen: false,
        mode: 'ADD',
    },
    month: getCurrentMonth(),
    status: 'IDLE',
};

export const loadExpenses = createAsyncThunk<ApiExpenseGetResponse, YearMonth, AppThunkApi>(
    'expense/getExpense',
    async (month) => {
        return fetchExpenses(month);
    },
);

const ExpenseSlice = createSlice({
    extraReducers(builder) {
        builder
            .addCase(loadExpenses.pending, (state) => {
                state.status = 'LOADING';
            })
            .addCase(loadExpenses.fulfilled, (state, action) => {
                state.status = 'SUCCESS';
                state.data = action.payload;
            })
            .addCase(loadExpenses.rejected, (state) => {
                state.status = 'FAILED';
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
    },
});

export const { openModal, closeModal } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;