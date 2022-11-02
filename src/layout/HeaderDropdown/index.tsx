import { Dropdown } from "antd";
import type { DropDownProps } from "antd/es/dropdown";
export type HeaderDropdownProps = {
  overlayClassName?: string;
  menu: React.ReactNode | (() => React.ReactNode) | any;
  placement?:
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomCenter";
} & Omit<DropDownProps, "menu">;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ ...restProps }) => (
  <Dropdown {...restProps} />
);

export default HeaderDropdown;
