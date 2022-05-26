import axios from "axios";

const api = (token?: string) =>
  axios.create({
    baseURL: "https://uzoapi2.herokuapp.com",
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

export default api;
