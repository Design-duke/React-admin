import { extend } from "umi-request";

const baseURL: any = import.meta.env.VITE_BASE_URL;
const request = extend({
  prefix: baseURL,
  timeout: 10000,
});

export const loginApi = (data: Object) =>
  request("/sys/login", {
    method: "POST",
    data,
  });
