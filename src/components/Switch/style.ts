import { css } from "styled-components";
import { SwitchProps } from "./Switch";

export const getWrapperHeight = ({ size }: Pick<SwitchProps, "size">) => css`
  height: ${size === "medium" ? "24px" : "28px"};
`;

export const getSwitchSize = ({ size }: Pick<SwitchProps, "size">) => {
  const width = size === "medium" ? "48px" : "56px";
  const height = size === "medium" ? "24px" : "28px";

  return css`
    width: ${width};
    height: ${height};
  `;
};

export const getSwitchStyle = ({
  variant,
  checked,
}: Pick<SwitchProps, "variant" | "checked">) => {
  if (variant === "outline") {
    return css`
      background-color: ${({ theme }) => theme.colors.general.white};
      border: ${({ theme }) =>
        checked
          ? `1px solid ${theme.colors.primary["500"]}`
          : `1px solid ${theme.colors.general["300"]}`};
    `;
  } else {
    return css`
      background-color: ${({ theme }) =>
        checked ? theme.colors.primary["500"] : theme.colors.primary.disabled};
      border: none;
    `;
  }
};

export const getSwitchHandleSize = ({
  size,
  variant,
  checked,
}: Pick<SwitchProps, "size" | "variant" | "checked">) => {
  const mediumSize = variant === "default" ? "20px" : "18px";
  const largeSize = variant === "default" ? "23.33px" : "21px";

  if (size === "medium") {
    return css`
      width: ${mediumSize};
      height: ${mediumSize};
      margin-top: 2px;
      margin-left: ${checked ? "26px" : "2px"};
    `;
  } else {
    return css`
      width: ${largeSize};
      height: ${largeSize};
      margin-top: 2px;
      margin-left: ${checked ? "30.33px" : "2.33px"};
    `;
  }
};

export const getSwitchHandleStyle = ({
  variant,
  checked,
}: Pick<SwitchProps, "variant" | "checked">) => {
  return variant === "outline"
    ? css`
        background-color: ${({ theme }) =>
          checked ? theme.colors.primary["500"] : theme.colors.general["300"]};
      `
    : css`
        background-color: ${({ theme }) => theme.colors.general.white};
      `;
};

export const getLabelSize = ({ align }: Pick<SwitchProps, "align">) =>
  align === "left"
    ? css`
        margin-right: 8px;
      `
    : css`
        margin-left: 8px;
      `;

export const getLabelStyle = ({ size }: Pick<SwitchProps, "size">) => {
  return size === "medium"
    ? css`
        ${({ theme }) => theme.typography.sm};
        color: ${({ theme }) => theme.colors.text.primary};
      `
    : css`
        ${({ theme }) => theme.typography.md};
        color: ${({ theme }) => theme.colors.text.primary};
      `;
};
