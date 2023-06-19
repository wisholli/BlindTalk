import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../api/api";
import { initialUserData } from "../../types";

const initialState: initialUserData = {
  data: [],
};

export const getUsers = createAsyncThunk("users/getUsers", async function () {
  const response = await usersApi.getUsers();
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export default usersSlice.reducer;
