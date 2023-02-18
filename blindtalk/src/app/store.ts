import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import conversationsSlice from "../features/conversations/conversationsSlice";
import authSlice from "../features/login/authSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    conversations: conversationsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
