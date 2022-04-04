export const baseURL =
  import.meta.env.MODE == "development"
    ? "https://uzoback.herokuapp.com"
    : import.meta.env.API_URL;
