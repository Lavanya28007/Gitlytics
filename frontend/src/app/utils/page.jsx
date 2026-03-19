// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // OK if you're using Next.js API routes or proxy
});

// ✅ FIXED: Safe access to localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;