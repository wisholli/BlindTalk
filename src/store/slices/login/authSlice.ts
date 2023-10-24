import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../../api/api";
import {
  AuthData,
  initialAuthData,
  RegisterData,
  ValidationErrors,
} from "../../../types";
import { AxiosError } from "axios";

const initialState: initialAuthData = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  profileId: 0,
  error: null,
  isLoading: false,
};

interface IReturnedUserData extends Omit<initialAuthData, "id" | "password"> {
  id: number;
}

export const login = createAsyncThunk<
  void,
  AuthData,
  { rejectValue: ValidationErrors }
>("auth/login", async (data: AuthData, { dispatch, rejectWithValue }) => {
  try {
    await authApi.login(data).then(() => dispatch(getAuthStatus()));
  } catch (err) {
    let error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getAuthStatus = createAsyncThunk<
  IReturnedUserData,
  void,
  { rejectValue: ValidationErrors }
>("auth/getAuthStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.getAuthStatus();
    return response.data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk<
  void,
  RegisterData,
  { rejectValue: ValidationErrors }
>(
  "auth/register",
  async function (data: RegisterData, { dispatch, rejectWithValue }) {
    try {
      const { email, password } = data;
      await authApi
        .register(data)
        .then(() => dispatch(login({ password, email })));
    } catch (err) {
      let error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
    builder.addCase(getAuthStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAuthStatus.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.userId = payload.id;
      state.profileId = payload.profileId;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.isLoading = false;
    });
    builder.addCase(getAuthStatus.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
