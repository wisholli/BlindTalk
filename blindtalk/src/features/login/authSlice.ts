import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/api";
import { AuthData, initialAuthData, RegisterData } from "../../types";

const initialState: initialAuthData = {
  id: null,
  email: "",
};

export const login = createAsyncThunk<void, AuthData>(
  "auth/login",
  async function (data: AuthData, { dispatch }) {
    await authApi.login(data);
    dispatch(getAuthStatus());
  }
);

export const getAuthStatus = createAsyncThunk<initialAuthData>(
  "auth/getAuthStatus",
  async function () {
    const response = await authApi.getAuthStatus();
    const { id, email }: initialAuthData = response.data;
    return { id, email };
  }
);

export const register = createAsyncThunk<void, RegisterData>(
  "auth/register",
  async function (data: RegisterData, { dispatch }) {
    const { password } = data;
    const response = await authApi.register(data);
    if (response.data) {
      const { email } = response.data;
      dispatch(login({ password, email }));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthStatus.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
    });
  },
});

export default authSlice.reducer;
