import { notification } from "antd";

const baseURL: any = import.meta.env.VITE_BASE_URL;

const codeMessage: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

/**
 * 异常处理函数
 */
const errorHandler = (error: any) => {
  const { status, url } = error;
  if (status) {
    const errorText = codeMessage[status] || "未知错误";
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
      title: undefined
    });
  } else {
    notification.error({
      message: "网络异常",
      description: "您的网络发生异常，无法连接服务器",
      title: undefined
    });
  }
  return Promise.reject(error);
};

/**
 * 统一封装 fetch 请求
 */
const request = async (url: string, options: RequestInit = {}) => {
  const fullUrl = baseURL + url;

  // 默认配置
  const defaultOptions: RequestInit = {
    method: "GET",
    credentials: "include", // 根据需要决定是否携带 cookie
    ...options,
  };

  // 处理请求数据
  let newBody = options.body;
  if (
    !(options.body instanceof FormData) &&
    typeof options.body === "object" &&
    options.body !== null
  ) {
    // @ts-ignore
    defaultOptions["Content-Type"] = "application/json";
    newBody = JSON.stringify(options.body);
  }

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    body: newBody as BodyInit,
  };

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      throw {
        status: response.status,
        url: fullUrl,
      };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return errorHandler({
      status: error.status || 0,
      url: fullUrl,
    });
  }
};

export default request;
