export const baseURL =
  import.meta.env.MODE == "development"
    ? "https://uzoapi2.herokuapp.com"
    : import.meta.env.API_URL;
