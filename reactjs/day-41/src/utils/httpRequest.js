import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

httpRequest.interceptors.response.use((response) => {
  return response.data;
});

export default httpRequest;
