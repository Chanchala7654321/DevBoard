import axios from "axios";

const api = axios.create({
  baseURL: "https://devboard-zskv.onrender.com",
});

export default api;