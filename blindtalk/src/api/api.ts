import axios from "axios";
import { RegisterData } from "../types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/",
});

export const authApi = {
  login(email: string, password: string) {
    return instance.post("auth/login", {
      email,
      password,
    });
  },
  getAuthStatus() {
    return instance.get("auth/status");
  },
  register(data: RegisterData) {
    return instance.post("auth/register", data);
  },
};

export const usersApi = {
  getUsers() {
    return instance.get("/users");
  },
};

export const converationsApi = {
  createANewConversation(recipientId: number, message: string) {
    return instance.post("conversations", {
      recipientId,
      message,
    });
  },
  getConversations() {
    return instance.get("conversations");
  },
  getConversationData(id: string) {
    return instance.get(`conversations/${id}`);
  },
};

export const messagesApi = {
  getMessages(id: string) {
    return instance.get(`messages/${id}`);
  },
  sendMessage(conversationId: number, content: string) {
    return instance.post("messages", { conversationId, content });
  },
  editMessage(messageId: number, content: string) {
    return instance.patch("messages", { messageId, content });
  },
};
