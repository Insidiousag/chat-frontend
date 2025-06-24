// src/api.js
import axios from "axios";

// Pull in your Render backend URL from the Vite environment
const baseURL = import.meta.env.VITE_API_BASE_URL; // e.g. "https://chat-backend-bbts.onrender.com"

// Create an Axios instance that sends credentials (cookies) on every request
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,   // ← ensure cookies (JWT) are sent cross-site
});

export default api;
