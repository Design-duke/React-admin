import request from "@/utils/request";

const prefix = `/auth`;
export const registerApi = (data: { username: string; password: string }) => {
  return request(`${prefix}/register`, {
    method: "POST",
    data,
  });
};

export const loginApi = (data: { username: string; password: string }) => {
  return request(`${prefix}/login`, {
    method: "POST",
    data,
  });
};
