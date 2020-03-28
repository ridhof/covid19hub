import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://covid19hub-api.now.sh/api/news`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getNews(page = 1) {
    return apiClient.get("/" + page);
  }
};
