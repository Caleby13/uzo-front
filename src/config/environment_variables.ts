export const baseURL ="https://uzoapi2.herokuapp.com"

export const baseURLBackup =
  import.meta.env.MODE == "development"
    ? "https://uzoapi2.herokuapp.com"
    : import.meta.env.API_URL;
