import request from "@/utils/request";

export const getRequestApi = (params: Object) => {
  
  return request("", {
    method: "GET",
  });
};
export const postRequestApi = (data: Object) =>
  request("", {
    method: "POST",
    body: data,
  });
