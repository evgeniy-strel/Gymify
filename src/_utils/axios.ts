import axios from "axios";

const BASE_URL = "https://gymify-backend-ten.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
