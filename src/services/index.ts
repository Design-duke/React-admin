import request from "@/utils/request";

export const getRequestApi = (params: Object) => {
  return request("/login", {
    method: "GET",
    params,
  });
};
export const postRequestApi = (data: FormData) =>
  request("/login", {
    method: "POST",
    data,
  });
