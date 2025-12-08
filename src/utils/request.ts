import { notification } from "antd";

const baseURL = import.meta.env.VITE_BASE_URL;

// 扩展请求选项类型，支持 params 和 data
interface CustomRequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, any>;
  data?: any;
}

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
      title: undefined,
    });
  } else {
    notification.error({
      message: "网络异常",
      description: "您的网络发生异常，无法连接服务器",
      title: undefined,
    });
  }
  return Promise.reject(error);
};

const serializeParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      searchParams.append(key, String(params[key]));
    }
  });
  return searchParams.toString();
};

/**
 * 统一封装 fetch 请求
 */
const request = async (url: string, options: CustomRequestOptions = {}) => {
  const { params, data, ...fetchOptions } = options;

  // 构建完整 URL
  let fullUrl = baseURL + url;

  // 处理 GET 请求的查询参数
  if (params && Object.keys(params).length > 0) {
    const queryString = serializeParams(params);
    if (queryString) {
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
    }
  }
  const token = localStorage.getItem("token");
  // 默认配置
  const defaultOptions: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  };

  // 处理请求数据
  let newBody: BodyInit | null = null;
  if (data !== undefined && data !== null) {
    // 如果是 FormData 则直接使用
    if (data instanceof FormData) {
      newBody = data;
      // 删除 Content-Type，让浏览器自动设置
      delete (defaultOptions.headers as Record<string, string>)["Content-Type"];
    }
    // 如果是普通对象或数组，转换为 JSON 字符串
    else if (typeof data === "object") {
      newBody = JSON.stringify(data);
    }
    // 其他情况直接使用
    else {
      newBody = String(data);
    }
  }

  const finalFetchOptions: RequestInit = {
    ...defaultOptions,
    body: newBody,
  };

  try {
    const response = await fetch(fullUrl, finalFetchOptions);

    if (!response.ok) {
      throw {
        status: response.status,
        url: fullUrl,
      };
    }

    const contentType = response.headers.get("content-type");
    let resultData: any;

    // 根据响应内容类型解析数据
    if (contentType && contentType.includes("application/json")) {
      resultData = await response.json();
    } else {
      resultData = await response.text();
    }

    return resultData;
  } catch (error: any) {
    return errorHandler({
      status: error.status || 0,
      url: fullUrl,
    });
  }
};

export default request;
