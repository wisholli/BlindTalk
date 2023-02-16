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
