import { store } from './Store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export interface AppThunkApi {
    state: RootState,
    dispatch: AppDispatch
}


export type ApiStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILED'