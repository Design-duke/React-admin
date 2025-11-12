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

// 1.什么是闭包
// 闭包是指有权访问另一个函数作用域中的变量的函数。简单来说，闭包允许一个函数访问并操作其外部函数的变量，即使外部函数已经执行完毕。
// 2.闭包的作用
// 闭包的主要作用包括数据封装、模拟私有变量、实现函数工厂和保持状态等。通过闭包，可以创建出具有独立作用域的函数，从而避免全局变量污染，提高代码的模块化和可维护性。
// 3.闭包的使用场景
// 闭包常用于以下场景：创建私有变量、实现函数工厂、保持状态、模拟私有变量、数据封装、实现模块化等。
// 4.闭包的优缺点
// 优点：数据封装、模拟私有变量、实现函数工厂、保持状态等。缺点：可能导致内存泄漏、调试困难、性能问题等。
// 5.闭包的注意事项
// 注意事项包括避免过度使用闭包、注意内存泄漏、理解作用域链、避免命名冲突等。合理使用闭包可以提高代码的质量和可维护性，但过度使用可能导致性能问题和调试困难。
