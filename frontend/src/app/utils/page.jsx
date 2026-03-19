import axios from "axios";

const api = axios.create({
  baseURL: "/api", 
});

api.interceptors.request.use((config) => {
  // 1. If we are on the server (prerendering), just return config and skip
  if (typeof window === "undefined") {
    return config;
  }

  // 2. Now it's safe to use localStorage because we're in the browser
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;