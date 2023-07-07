import request from "@/utils/request";

export const getRequestApi = (params: Object) =>
  request("", {
    params,
  });

export const postRequestApi = (data: Object) =>
  request("", {
    method: "POST",
    data,
  });
