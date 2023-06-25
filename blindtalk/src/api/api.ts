import axios from "axios";
import {
  AuthData,
  ConversationData,
  EditMessageData,
  NewConversationData,
  RegisterData,
  SendMessageData,
  UserData,
  UserProfileInfoForUpdate,
} from "../types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/api/",
});

export const authApi = {
  login(data: AuthData) {
    return instance.post("auth/login", data);
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
  updateUser(data: Omit<UserData, "email" | "profileId">) {
    return instance.patch("/users", data);
  },
};

export const converationsApi = {
  createANewConversation(data: NewConversationData) {
    return instance.post("conversations", data);
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
  sendMessage(data: SendMessageData) {
    return instance.post("messages", data);
  },
  editMessage(data: EditMessageData) {
    return instance.patch("messages", data);
  },
};

export const profilesApi = {
  getProfiles() {
    return instance.get(`profiles`);
  },
  getUserProfile(id: number) {
    return instance.get(`profiles/${id}`);
  },
  editUserProfile(data: UserProfileInfoForUpdate) {
    return instance.patch(`profiles/${data.id}`, data);
  },
  deleteUserProfile(id: number) {
    return instance.delete(`profiles/${id}`);
  },
};
