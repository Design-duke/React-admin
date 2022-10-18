import axios, { type AxiosInstance } from "axios";
const baseURL: any = import.meta.env.VITE_BASE_URL;
const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export const LoginApi = (data: any) => {
  return service({
    url: "/sys/login",
    method: "POST",
    data,
  });
};
