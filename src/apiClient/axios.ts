import {
  AUTH_LOCAL_STORAGE_NAME,
  BASE_URL,
  BASE_URL_LOCALHOST,
} from "./consts";

import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const key = localStorage.getItem(AUTH_LOCAL_STORAGE_NAME);

  if (key) {
    config.headers[AUTH_LOCAL_STORAGE_NAME] = key;
  }

  return config;
});

export default api;
