import axios from "axios";

const baseUrl = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseUrl;
