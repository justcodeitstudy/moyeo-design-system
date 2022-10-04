import React, { HTMLAttributes, useCallback } from "react";
import styled, { css } from "styled-components";

type LabelAlign = "left" | "right";
type Size = "medium" | "large";
type Variant = "default" | "outline";

export interface SwitchProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked: boolean;
  label?: string;
  labelAlign?: LabelAlign;
  size?: Size;
  variant?: Variant;
  onChange?: (value: boolean) => void;
}

const Switch = ({
  id,
  checked,
  label,
  labelAlign = "right",
  size = "medium",
  variant = "default",
  onChange,
  ...rest
}: SwitchProps) => {
  const handleClick = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  return (
    <Wrapper {...rest}>
      {label && labelAlign === "left" && (
        <StyledLabel htmlFor={id} size={size} labelAlign={labelAlign}>
          {label}
        </StyledLabel>
      )}
      <StyledSwitch
        id={id}
        role="switch"
        size={size}
        variant={variant}
        aria-checked={checked}
        checked={checked}
        onClick={handleClick}
      >
        <StyledStatus
          size={size}
          variant={variant}
          checked={checked}
        ></StyledStatus>
      </StyledSwitch>
      {label && labelAlign === "right" && (
        <StyledLabel htmlFor={id} size={size} labelAlign={labelAlign}>
          {label}
        </StyledLabel>
      )}
    </Wrapper>
  );
};

export default Switch;

const generateSwitchBorder = ({
  variant,
  checked,
}: Pick<SwitchProps, "variant" | "checked">) => {
  if (variant === "outline") {
    return css`
      border: ${checked ? `1px solid #06CBF7;` : `1px solid #DFDFDF`};
      background-color: #ffffff;
    `;
  } else {
    return css`
      border: none;
    `;
  }
};

const generateStatusSize = ({
  variant,
  size,
}: Pick<SwitchProps, "variant" | "size">) => {
  if (size === "medium") {
    return css`
      width: ${variant === "default" ? "20px" : "18px"};
      height: ${variant === "default" ? "20px" : "18px"};
    `;
  } else {
    return css`
      width: ${variant === "default" ? "23.33px" : "21px"};
      height: ${variant === "default" ? "23.33px" : "21px"};
    `;
  }
};

const generateStatusMargin = ({
  size,
  checked,
}: Pick<SwitchProps, "size" | "checked">) => {
  if (size === "medium") {
    return css`
      margin-top: 2px;
      margin-left: ${checked ? "26px" : "2px"};
    `;
  } else {
    return css`
      margin-top: 2.33px;
      margin-left: ${checked ? "30.33px" : "2.33px"};
    `;
  }
};

const generateSwitchBackground = ({
  variant,
  checked,
}: Pick<SwitchProps, "variant" | "checked">) => {
  if (variant === "outline") {
    return css`
      background-color: #ffffff;
    `;
  } else {
    return css`
      background-color: ${checked ? "#06CBF7" : "#e6e6e6"};
    `;
  }
};

const generateStatusAfterBackground = ({
  variant,
  checked,
}: Pick<SwitchProps, "variant" | "checked">) => {
  if (variant === "outline") {
    return css`
      background-color: ${checked ? `#06CBF7` : `#DFDFDF`};
    `;
  } else {
    return css`
      background-color: #ffffff;
    `;
  }
};

const generateLabelTypography = ({ size }: Pick<SwitchProps, "size">) => {
  if (size == "medium") {
    return css`
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    `;
  } else {
    return css`
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    `;
  }
};

const Wrapper = styled.div`
  margin-left: 0;
  margin-right: 0;
  display: inline-block;
`;

const StyledSwitch = styled.button<
  Pick<SwitchProps, "size" | "variant" | "checked">
>`
  padding: 0;
  margin: 0;
  height: ${({ size }) => (size === "medium" ? "24px" : "28px")};
  display: inline-block;
  background-color: transparent;
  vertical-align: middle;
  cursor: pointer;
`;

const StyledStatus = styled.span<
  Pick<SwitchProps, "size" | "variant" | "checked">
>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: ${({ size }) => (size === "medium" ? "48px" : "56px")};
  height: ${({ size }) => (size === "medium" ? "24px" : "28px")};
  ${(props) => generateSwitchBackground(props)};
  ${(props) => generateSwitchBorder(props)};
  border-radius: 999px;
  display: inline-block;
  transition: background 0.5s;

  &::after {
    ${(props) => generateStatusSize(props)}
    ${(props) => generateStatusMargin(props)}
    ${(props) => generateStatusAfterBackground(props)}
    content: "";
    display: block;
    border-radius: 50%;
    transition: margin-top 0.5s, margin-left 0.5s;
  }
`;

const StyledLabel = styled.label<Pick<SwitchProps, "size" | "labelAlign">>`
  ${({ labelAlign }) =>
    labelAlign === "left"
      ? css`
          margin-right: 8px;
        `
      : css`
          margin-left: 8px;
        `}
  ${(props) => generateLabelTypography(props)};
  color: #4d4d4d;
  vertical-align: text-top;
  cursor: pointer;
`;
