import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import conversationsSlice from "../features/conversations/conversationsSlice";
import authSlice from "../features/login/authSlice";
import messagesSlice from "../features/messages/messagesSlice";
import usersSlice from "../features/users/usersSlice";
import usersProfilesSlice from "../features/users/profilesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    conversations: conversationsSlice,
    messages: messagesSlice,
    profiles: usersProfilesSlice,
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
