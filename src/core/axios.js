import axios from "axios";

const instance = axios.create({
  baseURL: "https://cvety-edema.ru/api",
  // baseURL: "http://localhost:7777/api",
  withCredentials: true,
});

export default instance;
