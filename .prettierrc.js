export default {
  semi: true, // 语句结尾加分号
  singleQuote: false, // 使用单引号
  jsxSingleQuote: false, // JSX 中使用双引号（React 社区习惯）
  trailingComma: "es5", // 对象数组末尾加逗号
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 不使用 tab
  printWidth: 80, // 换行长度
  endOfLine: "lf", // 换行符：\n (Unix)
  arrowParens: "always", // 箭头函数单参数也加括号
  proseWrap: "preserve", // Markdown 换行
  embeddedLanguageFormatting: "auto", // 是否格式化模板字符串中的 HTML/CSS
  plugins: ["prettier-plugin-tailwindcss"],
};
