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
  editMessageId: 0,
};

export const getConversationMessages = createAsyncThunk<
  initialMessagesData,
  string
>("messages/getConversationMessages", async function (conversationId: string) {
  const response = await messagesApi.getMessages(conversationId);
  const { id, messages } = response.data;
  return { id, messages };
});

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async function (data: SendMessageData) {
    await messagesApi.sendMessage(data);
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
    receiveMessage: (state, { payload }) => {
      state.messages.unshift(payload);
    },
    setNewEditMessageId: (state, { payload }) => {
      state.editMessageId = payload;
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

export const { receiveMessage, setNewEditMessageId } = messagesSlice.actions;
export default messagesSlice.reducer;
