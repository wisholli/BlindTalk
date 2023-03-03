import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialConversationsData, NewConversationData } from "../../types";
import { converationsApi } from "../../api/api";

const initialState: initialConversationsData = {
  data: [],
  currentDialog: null,
};

export const createANewConversation = createAsyncThunk(
  "conversations/createNewConversation",
  async function (data: NewConversationData) {
    const response = await converationsApi.createANewConversation(data);
    return response.data;
  }
);

export const getConversations = createAsyncThunk(
  "conversations/getConversations",
  async function () {
    const response = await converationsApi.getConversations();
    return response.data;
  }
);

export const getConversationData = createAsyncThunk(
  "conversations/getConversationData",
  async function (id: string) {
    const response = await converationsApi.getConversationData(id);
    return response.data;
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createANewConversation.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });
    builder.addCase(getConversations.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(getConversationData.fulfilled, (state, { payload }) => {
      state.currentDialog = payload;
    });
  },
});

export default conversationsSlice.reducer;
