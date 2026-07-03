import { AUTH_LOCAL_STORAGE_NAME } from "../auth/utils/consts";
import { getAuthKeyFromLocalStorage } from "../auth/utils/helpers";

import axios from "axios";

const BASE_URL = "https://gymify-backend-ten.vercel.app";
const BASE_URL_LOCALHOST = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const key = getAuthKeyFromLocalStorage();

  if (key) {
    config.headers[AUTH_LOCAL_STORAGE_NAME] = key;
  }

  return config;
});

export default api;
