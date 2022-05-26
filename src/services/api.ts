import axios from "axios";
import { baseURL } from "../config/environment_variables";

const api = (token?: string) =>
  axios.create({
    baseURL: baseURL ? `${baseURL}` : undefined,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

export default api;
