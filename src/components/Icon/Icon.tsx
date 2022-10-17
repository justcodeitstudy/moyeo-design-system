import React from "react";
import { SVGAttributes } from "react";
import { Theme } from "../../styles/theme";
import iconList from "./iconList";

export type IconName = keyof typeof iconList;
export interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName;
  size?: number;
}

const Icon = ({
  size = 24,
  name,
  color = Theme.colors.general[500],
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {iconList[name]}
    </svg>
  );
};

export default Icon;
