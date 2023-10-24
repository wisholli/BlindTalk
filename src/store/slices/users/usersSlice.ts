import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../../api/api";
import { UserData, ValidationErrors, initialUserData } from "../../../types";
import { AxiosError } from "axios";

const initialState: initialUserData = {
  users: [],
  error: null,
  isLoading: false,
};

export const getUsers = createAsyncThunk<
  UserData[],
  void,
  {
    rejectValue: ValidationErrors;
  }
>("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await usersApi.getUsersWithoutConversationWithMe();
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
