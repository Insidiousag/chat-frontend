// src/api.js
import axios from "axios";

// Pull in your Render backend URL from the Vite environment
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
  baseURL,                       // e.g. https://chat-backend-bbts.onrender.com
  headers: { "Content-Type": "application/json" },
});

export default api;
