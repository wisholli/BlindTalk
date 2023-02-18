import axios from "axios";

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
};
