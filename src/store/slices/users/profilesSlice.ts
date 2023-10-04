import { UserData, UserProfile } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProfileInfoForUpdate, initialProfilesData } from "../../../types";
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

export const getUserProfile = createAsyncThunk<
  UserProfileInfoForUpdate,
  number
>("usersProfiles/getUserProfile", async function (id: number) {
  const response = await profilesApi.getUserProfile(id);
  return response.data;
});

export const updateUserProfile = createAsyncThunk<UserProfile, UserProfile>(
  "usersProfiles/updateUserProfile",
  async function (data: UserProfile) {
    const response = await profilesApi.editUserProfile(data);
    return response.data;
  }
);

export const updateUserLastNameFirstName = createAsyncThunk<
  Omit<UserData, "email" | "profileId">,
  Omit<UserData, "email" | "profileId">
>(
  "usersProfiles/updateUserLastNameFirstName",
  async function (data: Omit<UserData, "email" | "profileId">) {
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
      let currentUserIndex = state.data.findIndex((u) => u.id === payload.id);
      let userProfile: UserProfile = {
        id: payload.id!,
        avatarUrl: payload.avatarUrl!,
        birthDay: payload.birthDay!,
        city: payload.city!,
        country: payload.country!,
        sex: payload.sex!,
        status: payload.status!,
        user: {
          firstName: state.data[currentUserIndex].user.firstName,
          lastName: state.data[currentUserIndex].user.lastName,
          profileId: state.data[currentUserIndex].user.profileId,
        },
      };
      state.currentUserProfile = userProfile;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      let currentUserIndex = state.data.findIndex((u) => u.id === payload.id);
      if (currentUserIndex >= 0) state.data[currentUserIndex] = payload;
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
