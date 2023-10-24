import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesApi } from "../../../api/api";
import {
  EditMessageData,
  initialMessagesData,
  MessageData,
  SendMessageData,
  ValidationErrors,
} from "../../../types";
import { AxiosError } from "axios";

const initialState: initialMessagesData = {
  conversationId: 0,
  messages: [],
  editMessageId: 0,
  error: null,
  isLoading: true,
};

interface IMessageFromServer {
  id: number;
  messages: MessageData[];
}

export const getConversationMessages = createAsyncThunk<
  IMessageFromServer,
  string,
  { rejectValue: ValidationErrors }
>(
  "messages/getConversationMessages",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const response = await messagesApi.getMessages(conversationId);
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

export const sendMessage = createAsyncThunk<
  void,
  SendMessageData,
  { rejectValue: ValidationErrors }
>(
  "messages/sendMessage",
  async (data: SendMessageData, { rejectWithValue }) => {
    try {
      await messagesApi.sendMessage(data);
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

export const editMessage = createAsyncThunk<
  EditMessageData,
  EditMessageData,
  { rejectValue: ValidationErrors }
>(
  "messages/editMessage",
  async (newData: EditMessageData, { rejectWithValue }) => {
    try {
      await messagesApi.editMessage(newData);
      return newData;
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
    resetEdaitMessageId: (state) => {
      state.editMessageId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConversationMessages.fulfilled, (state, { payload }) => {
      state.conversationId = payload.id;
      state.messages = payload.messages;
      state.isLoading = false;
    });
    builder.addCase(
      getConversationMessages.rejected,
      (state, { error, payload }) => {
        if (payload) {
          state.error = payload.message;
        } else {
          state.error = error.message;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(sendMessage.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
    });
    builder.addCase(editMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editMessage.fulfilled, (state, { payload }) => {
      state.messages = state.messages.map((m) => {
        if (m.id === payload.messageId) {
          m.content = payload.content;
        }
        return m;
      });
      state.isLoading = false;
    });
    builder.addCase(editMessage.rejected, (state, { error, payload }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
  },
});

export const { receiveMessage, setNewEditMessageId, resetEdaitMessageId } =
  messagesSlice.actions;
export default messagesSlice.reducer;
