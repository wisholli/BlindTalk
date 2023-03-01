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
    const { email, password } = data;
    await authApi.login(email, password);
    dispatch(getAuthStatus());
  }
);

export const getAuthStatus = createAsyncThunk(
  "auth/getAuthStatus",
  async function () {
    const response = await authApi.getAuthStatus();
    const { id, email } = response.data;
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
    builder.addCase(
      getAuthStatus.fulfilled,
      (state, { payload }: PayloadAction<initialAuthData>) => {
        state.id = payload.id;
        state.email = payload.email;
      }
    );
  },
});

export default authSlice.reducer;
