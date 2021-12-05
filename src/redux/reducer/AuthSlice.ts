import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiUserCredentials } from '../../services/api.types';
import { getApiToken, updateAuthorizationHeader } from '../../services/auth.service';

interface AuthState {
    authenticated: boolean,
    token?: string,
    user?: {
        login: string
    }
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED'
}

const initialState: AuthState = {
    authenticated: false,
    status: 'IDLE',
};
export const login = createAsyncThunk<string, ApiUserCredentials>(
    'auth/fetchAuthToken',
    async (user: ApiUserCredentials) => {
        return getApiToken(user);
    });

const AuthSlice = createSlice({
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'LOADING';
            })
            .addCase(login.fulfilled, (state, action) => {
                const token = action.payload;
                state.authenticated = true;
                state.token = token;
                state.status = 'SUCCESS';
                state.user = {
                    login: action.meta.arg.login,
                };
                updateAuthorizationHeader(token);
            })
            .addCase(login.rejected, (state) => {
                state.status = 'FAILED';
            });
    },
    initialState,
    name: 'auth',
    reducers: {
        logout: (state) => {
            state.token = undefined;
            state.authenticated = false;
            state.user = undefined;
        },
    },
});


export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;