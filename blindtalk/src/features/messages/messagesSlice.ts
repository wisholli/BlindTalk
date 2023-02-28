import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesApi } from "../../api/api";
import { initialMessagesData, SendMessageData } from "../../types";

const initialState: initialMessagesData = {
  id: 0,
  messages: [],
};

export const getConversationMessages = createAsyncThunk(
  "messages/getConversationMessages",
  async function (conversationId: string) {
    const response = await messagesApi.getMessages(conversationId);
    const { id, messages } = response.data;
    return { id, messages };
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async function ({ conversationId, content }: SendMessageData, { dispatch }) {
    const response = await messagesApi.sendMessage(conversationId, content);
    console.log(response);

    dispatch(addMessage({ conversationId, content }));
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationMessages.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.messages = payload.messages;
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
