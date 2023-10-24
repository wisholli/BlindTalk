import { UserProfile, ValidationErrors } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProfilesData } from "../../../types";
import { profilesApi } from "../../../api/api";
import { AxiosError } from "axios";

const initialState: initialProfilesData = {
  currentUserProfile: null,
  userForUpdate: null,
  authorizedUserAvatar: null,
  isLoading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk<
  UserProfile,
  number,
  { rejectValue: ValidationErrors }
>("usersProfiles/getUserProfile", async (id: number, { rejectWithValue }) => {
  try {
    const response = await profilesApi.getUserProfile(id);
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

export const updateUserProfile = createAsyncThunk<
  UserProfile,
  UserProfile,
  { rejectValue: ValidationErrors }
>(
  "usersProfiles/updateUserProfile",
  async (data: UserProfile, { rejectWithValue }) => {
    try {
      const response = await profilesApi.editUserProfile(data);
      return response.data;
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

const usersProfilesSlice = createSlice({
  name: "usersProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.currentUserProfile = payload;
      if (!state.authorizedUserAvatar && payload.avatarUrl)
        state.authorizedUserAvatar = payload.avatarUrl;
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.currentUserProfile = payload;
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
  },
});
export default usersProfilesSlice.reducer;
