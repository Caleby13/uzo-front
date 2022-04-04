import axios from "axios";

const api = axios.create({
  baseURL: "https://uzoback.herokuapp.com",
});

export default api;
