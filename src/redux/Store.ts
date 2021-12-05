import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducer/AuthSlice';
import ExpenseReducer from './reducer/ExpenseSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        expense: ExpenseReducer,
    },
});
