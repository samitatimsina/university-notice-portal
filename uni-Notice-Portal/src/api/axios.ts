import axios from "axios";
import { getAuth } from "firebase/auth";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;

  if (user) {
    const token = await user.getIdToken();

    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});