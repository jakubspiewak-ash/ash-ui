import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducer/AuthSlice';
import ExpenseReducer from './reducer/ExpenseSlice';

const preloadedState = JSON.parse(localStorage.getItem('ash-state') || '{}');

export const store = configureStore({
    preloadedState,
    reducer: {
        auth: AuthReducer,
        expense: ExpenseReducer,
    },
});

store.subscribe(async () => {
    const state = store.getState();
    localStorage.setItem('ash-state', JSON.stringify(state));
});