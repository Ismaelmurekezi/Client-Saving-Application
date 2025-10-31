import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Get token from sessionStorage (where Zustand persist stores it)
  const authData = sessionStorage.getItem("client-auth");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
  }
  return config;
});

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  deviceId?: string;
}

export interface LoginData {
  email: string;
  password: string;
  deviceId?: string;
}

export interface TransactionData {
  amount: number;
}

export const authAPI = {
  register: (data: RegisterData) => api.post("/auth/register", data),
  login: (data: LoginData) => api.post("/auth/login", data),
  getVerificationStatus: (deviceId: string) =>
    api.get(`/auth/verification-status/${deviceId}`),
};

export default api;
