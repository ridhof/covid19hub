import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://covid19hub-api.now.sh/api/nasional`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getToday() {
    return apiClient.get("/today");
  },
  getTimeline() {
    return apiClient.get("/data");
  }
};
