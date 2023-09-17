import { UserData, UserProfile } from "../../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProfileInfoForUpdate, initialProfilesData } from "../../../types";
import { profilesApi, usersApi } from "../../../api/api";

const initialState: initialProfilesData = {
  data: [],
  currentUserProfile: null,
  userForUpdate: null,
};

export const getUsersProfiles = createAsyncThunk(
  "usersProfiles/getUsersProfiles",
  async function () {
    const response = await profilesApi.getProfiles();
    return response.data;
  }
);

export const getUserProfile = createAsyncThunk(
  "usersProfiles/getUserProfile",
  async function (id: number) {
    const response = await profilesApi.getUserProfile(id);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk<
  UserProfileInfoForUpdate,
  UserProfileInfoForUpdate
>(
  "usersProfiles/updateUserProfile",
  async function (data: UserProfileInfoForUpdate) {
    const response = await profilesApi.editUserProfile(data);
    return response.data;
  }
);

export const updateUserLastNameFirstName = createAsyncThunk(
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
      state.currentUserProfile = payload;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      let { id } = payload;
      let userForUpdate = state.data.filter((u) => u.id === id);
      userForUpdate[0] = payload as UserProfile;
      state.currentUserProfile = payload as UserProfile;
    });
    builder.addCase(
      updateUserLastNameFirstName.fulfilled,
      (state, { payload }) => {
        let { id, firstName, lastName } = payload;
        let userForUpdate = state.data.filter((u) => u.id === id);
        userForUpdate[0].user.firstName = firstName;
        userForUpdate[0].user.lastName = lastName;
      }
    );
  },
});

export default usersProfilesSlice.reducer;
