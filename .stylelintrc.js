/** @type {import('stylelint').Config} */
export default {
  // 继承官方标准规则（可选，如果你只想排序，可以去掉）
  extends: ["stylelint-config-standard"],

  // 启用插件
  plugins: ["stylelint-order"],

  // 指定自定义语法解析器（支持 Less）
  customSyntax: "postcss-less",

  // 规则配置
  rules: {
    // 控制声明块内各部分的顺序：变量 → 属性 → 嵌套规则 → @规则
    "order/order": [
      "custom-properties", // --my-color: red;
      "dollar-variables", // $color: red; (Less)
      "declarations", // 普通 CSS 属性
      "rules", // 嵌套选择器
      "at-rules", // @media, @keyframes 等
    ],

    // 定义 CSS 属性的具体排序顺序
    "order/properties-order": [
      // 布局 & 定位
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",

      // 盒模型 & 弹性布局
      "display",
      "flex",
      "flex-direction",
      "flex-wrap",
      "justify-content",
      "align-items",
      "gap",

      // 尺寸
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",

      // 间距
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",

      // 外观
      "border",
      "border-radius",
      "background",
      "background-color",
      "box-shadow",

      // 文字
      "font-size",
      "font-weight",
      "line-height",
      "color",
      "text-align",

      // 其他
      "opacity",
      "cursor",
      "transition",
      "transform",
    ],
  },
};
