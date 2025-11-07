// 获取字符串数组的最长公共子串
const longestCommonSubstring = (strings: string[]): string => {
  if (!Array.isArray(strings) || strings.length === 0) return "";
  // 如果数组只有一个字符串，那它本身就是“公共子串”
  if (strings.length === 1) return strings[0];

  const base = strings.reduce((prev, curr) => {
    if (prev.length < curr.length) {
      return prev;
    } else {
      return curr;
    }
  });
  const len = base.length;
  for (let length = len; length > 0; length--) {
    for (let start = 0; start <= len - length; start++) {
      const substr = base.substring(start, start + length);
      if (strings.every((str) => str.includes(substr))) {
        return substr;
      }
    }
  }

  return "";
};

// 测试
const arr = ["abcdfg", "abcf", "abcfghrewq"];
const result = longestCommonSubstring(arr);
console.log("最长公共子串:", result); // 输出: "abc"
