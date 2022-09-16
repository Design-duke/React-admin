/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr: string = "";
  let newArr: any[] = [];
  let arr = path.split("/").map((i) => "/" + i);
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    newArr.push(newStr);
  }
  return newArr;
};

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  auth?: boolean;
  path?: string;
}
/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (
  path: string,
  routes: RouteObject[] = []
): RouteObject => {
  let result: RouteObject = {};
  for (let item of routes) {
    const pathItem = "/" + item.path;
    if (item.path === path || pathItem === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

export function proxy() {
  let obj: any = { text: "vue3" };
  const bucket = new Set();
  const newObj = new Proxy(obj, {
    get(target, key) {
      bucket.add(effect);
      return target[key];
    },
    set(target, key, newValue) {
      target[key] = newValue;
      bucket.forEach((fn) => fn());
      return true;
    },
  });
  function effect() {
    document.getElementById("test")?.innerText = newObj.text;
  }
  effect();
  newObj.text = "vue3响应了";
}
