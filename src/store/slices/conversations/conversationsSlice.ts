import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ConversationData,
  NewConversationData,
  ValidationErrors,
  initialConversationsData,
} from "../../../types";
import { converationsApi } from "../../../api/api";
import { AxiosError } from "axios";

const initialState: initialConversationsData = {
  conversations: [],
  currentDialog: null,
  isChatSelected: false,
  error: null,
  isLoading: false,
};

export const createANewConversation = createAsyncThunk<
  ConversationData,
  NewConversationData,
  { rejectValue: ValidationErrors }
>(
  "conversations/createNewConversation",
  async (data: NewConversationData, { rejectWithValue }) => {
    try {
      const response = await converationsApi.createANewConversation(data);
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

export const getConversations = createAsyncThunk<
  ConversationData[],
  void,
  { rejectValue: ValidationErrors }
>("conversations/getConversations", async (_, { rejectWithValue }) => {
  try {
    const response = await converationsApi.getConversations();
    return response.data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getConversationData = createAsyncThunk<
  ConversationData,
  string,
  { rejectValue: ValidationErrors }
>(
  "conversations/getConversationData",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await converationsApi.getConversationData(id);
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

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setIsChatSelected(state) {
      state.isChatSelected = !state.isChatSelected;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createANewConversation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createANewConversation.fulfilled, (state, { payload }) => {
      state.conversations = [...state.conversations, payload];
      state.isLoading = false;
    });
    builder.addCase(
      createANewConversation.rejected,
      (state, { payload, error }) => {
        if (payload) {
          state.error = payload.message;
        } else {
          state.error = error.message;
        }
        state.isLoading = false;
      }
    );
    builder.addCase(getConversations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConversations.fulfilled, (state, { payload }) => {
      state.conversations = payload;
      state.isLoading = false;
    });
    builder.addCase(getConversations.rejected, (state, { payload, error }) => {
      if (payload) {
        state.error = payload.message;
      } else {
        state.error = error.message;
      }
      state.isLoading = false;
    });
    builder.addCase(getConversationData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConversationData.fulfilled, (state, { payload }) => {
      if (state.conversations.length) {
        let data = state.conversations.find((d) => d.id === payload.id);
        let dataForCurrentDialog: ConversationData = {
          id: payload.id,
          createdAt: payload.createdAt,
          creator: data!.creator,
          recipient: data!.recipient,
        };
        state.currentDialog = dataForCurrentDialog;
      }

      state.isLoading = false;
    });
    builder.addCase(
      getConversationData.rejected,
      (state, { error, payload }) => {
        if (payload) {
          state.error = payload.message;
        } else {
          state.error = error.message;
        }
        state.isLoading = false;
      }
    );
  },
});

export const { setIsChatSelected } = conversationsSlice.actions;
export default conversationsSlice.reducer;
