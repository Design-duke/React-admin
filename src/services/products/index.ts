import request from "@/utils/request";
import type { DataType } from "@/types/products/index";

const prefix = `/products`;

export const getDataApi = (params?: { page: number; limit: number }) =>
  request(`${prefix}`, {
    params,
  });

export const addDataApi = (data: DataType) =>
  request(`${prefix}`, {
    method: "POST",
    data,
  });

export const updateDataApi = (id: string, data: DataType) =>
  request(`${prefix}/${id}`, {
    method: "PATCH",
    data,
  });

export const deleteDataApi = (id: string) =>
  request(`${prefix}/${id}`, {
    method: "DELETE",
  });
