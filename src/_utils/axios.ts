import axios from "axios";

const BASE_URL2 = "https://gymify-backend-ten.vercel.app";
const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
