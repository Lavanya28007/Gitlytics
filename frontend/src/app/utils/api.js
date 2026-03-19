import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  // Guard clause: if we aren't in the browser, just return the config
  if (typeof window === "undefined") {
    return config;
  }

  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // This handles cases where cookies/storage are disabled
    console.error("Auth Interceptor Error:", error);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;