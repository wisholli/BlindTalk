import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialConversationsData, NewConversationData } from "../../types";
import { converationsApi } from "../../api/api";

const initialState: initialConversationsData = {
  data: [],
};

export const createANewConversation = createAsyncThunk(
  "conversations/createNewConversation",
  async function ({ message, recipientId }: NewConversationData) {
    const response = await converationsApi.createANewConversation(
      recipientId,
      message
    );
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
  },
});

export default conversationsSlice.reducer;
