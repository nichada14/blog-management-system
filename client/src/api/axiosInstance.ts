import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token to send:", token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
