import request from "@/utils/request";

export const getRequestApi = (params: Object) =>
  request({
    url: "",
    method: "GET",
    params,
  });

export const postRequestApi = (data: Object) =>
  request({
    url: "",
    method: "POST",
    data,
  });
