import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ConversationData,
  NewConversationData,
  initialConversationsData,
} from "../../../types";
import { converationsApi } from "../../../api/api";

const initialState: initialConversationsData = {
  data: [],
  currentDialog: null,
  isChatSelected: false,
};

export const createANewConversation = createAsyncThunk<
  ConversationData,
  NewConversationData
>(
  "conversations/createNewConversation",
  async function (data: NewConversationData) {
    const response = await converationsApi.createANewConversation(data);
    return response.data;
  }
);

export const getConversations = createAsyncThunk<ConversationData[]>(
  "conversations/getConversations",
  async function () {
    const response = await converationsApi.getConversations();
    return response.data;
  }
);

export const getConversationData = createAsyncThunk<ConversationData, string>(
  "conversations/getConversationData",
  async function (id: string) {
    const response = await converationsApi.getConversationData(id);
    return response.data;
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setIsChatSelected(state) {
      state.isChatSelected = !state.isChatSelected;
    },
  },
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

export const { setIsChatSelected } = conversationsSlice.actions;
export default conversationsSlice.reducer;
