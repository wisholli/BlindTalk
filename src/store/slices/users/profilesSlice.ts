import { UserData, UserProfile } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProfilesData } from "../../../types";
import { profilesApi, usersApi } from "../../../api/api";

const initialState: initialProfilesData = {
  data: [],
  currentUserProfile: null,
  userForUpdate: null,
};

export const getUsersProfiles = createAsyncThunk<UserProfile[]>(
  "usersProfiles/getUsersProfiles",
  async function () {
    const response = await profilesApi.getProfiles();
    return response.data;
  }
);

export const getUserProfile = createAsyncThunk<UserProfile, number>(
  "usersProfiles/getUserProfile",
  async function (id: number) {
    const response = await profilesApi.getUserProfile(id);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk<UserProfile, UserProfile>(
  "usersProfiles/updateUserProfile",
  async function (data: UserProfile) {
    const response = await profilesApi.editUserProfile(data);
    return response.data;
  }
);

export const updateUserLastNameFirstName = createAsyncThunk<
  Omit<UserData, "email" | "profileId" | "profile">,
  Omit<UserData, "email" | "profileId" | "profile">
>(
  "usersProfiles/updateUserLastNameFirstName",
  async function (data: Omit<UserData, "email" | "profileId" | "profile">) {
    let { id, firstName, lastName } = data;
    await usersApi.updateUser(data);
    return { id, firstName, lastName };
  }
);

const usersProfilesSlice = createSlice({
  name: "usersProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersProfiles.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.currentUserProfile = payload;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.currentUserProfile = payload;
    });
    builder.addCase(
      updateUserLastNameFirstName.fulfilled,
      (state, { payload }) => {
        let { id, firstName, lastName } = payload;
        let currentUserIndex = state.data.findIndex((u) => u.id === id);
        if (currentUserIndex >= 0) {
          state.data[currentUserIndex].user.firstName = firstName;
          state.data[currentUserIndex].user.lastName = lastName;
        }
      }
    );
  },
});

export default usersProfilesSlice.reducer;
