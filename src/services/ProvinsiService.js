import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://covid19hub-api.now.sh/api/provinsi`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getAllProvinceToday() {
    return apiClient.get("/today");
  }
};
