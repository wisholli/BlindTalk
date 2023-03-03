import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesApi } from "../../api/api";
import {
  EditMessageData,
  initialMessagesData,
  SendMessageData,
} from "../../types";

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
  async function (data: SendMessageData, { dispatch }) {
    await messagesApi.sendMessage(data);
    dispatch(addMessage(data));
  }
);

export const editMessage = createAsyncThunk<EditMessageData, EditMessageData>(
  "messages/editMessage",
  async function (newData: EditMessageData) {
    await messagesApi.editMessage(newData);
    const { messageId, content } = newData;
    return { messageId, content };
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
    builder.addCase(editMessage.fulfilled, (state, { payload }) => {
      state.messages = state.messages.map((m) => {
        if (m.id === payload.messageId) {
          m.content = payload.content;
        }
        return m;
      });
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
