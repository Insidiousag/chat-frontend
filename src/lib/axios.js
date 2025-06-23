// // src/axios.js
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-backend-bbts.onrender.com/api",
});

// Automatically attach token in all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
