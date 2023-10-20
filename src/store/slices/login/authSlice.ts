import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../../api/api";
import { AuthData, initialAuthData, RegisterData } from "../../../types";

const initialState: initialAuthData = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  profileId: 0,
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
    return response.data;
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
      state.email = payload.email;
      state.id = payload.id;
      state.profileId = payload.profileId;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    });
  },
});

export default authSlice.reducer;
