import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
const baseURL: any = import.meta.env.VITE_BASE_URL;
const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
// 请求前的统一处理
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // JWT鉴权处理
    //@ts-ignore
    config.headers.token = JSON.parse(localStorage.getItem("token") || "");
    return config;
  },
  (error: AxiosError) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// Add a response interceptor
service.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default service;
