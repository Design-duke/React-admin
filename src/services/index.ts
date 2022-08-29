import request from "../utils/request";

export const getRequestApi = (params: string) => {
  return request({
    url: "",
    method: "GET",
    params,
  });
};
export const postRequestApi = (data: string) => {
  return request({
    url: "",
    method: "POST",
    data,
  });
};
