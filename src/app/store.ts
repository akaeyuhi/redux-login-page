import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from '../features/user/accountSlice';
import AuthService from '../services/AuthService';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/';

const authService = new AuthService(baseURL);

export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { authService },
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
