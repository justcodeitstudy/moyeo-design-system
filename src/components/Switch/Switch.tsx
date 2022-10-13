import React, { HTMLAttributes, useCallback } from "react";
import styled from "styled-components";
import {
  getLabelSize,
  getLabelStyle,
  getSwitchHandleSize,
  getSwitchHandleStyle,
  getSwitchSize,
  getSwitchStyle,
  getWrapperHeight,
} from "./style";

export type Align = "left" | "right";
export type Size = "medium" | "large";
export type Variant = "default" | "outline";

export interface LabelStatus {
  on?: string;
  off?: string;
}

export interface SwitchProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked: boolean;
  label?: LabelStatus;
  align?: Align;
  size?: Size;
  variant?: Variant;
  onChange?: (value: boolean) => void;
}

const Switch = ({
  id,
  checked,
  label = { on: "ON", off: "OFF" },
  align = "right",
  size = "medium",
  variant = "default",
  onChange,
  ...rest
}: SwitchProps) => {
  const handleClick = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  return (
    <Container {...rest}>
      {align === "left" && (
        <Label htmlFor={id} size={size} align={align}>
          {checked ? label.on : label.off}
        </Label>
      )}
      <Wrapper
        id={id}
        role="switch"
        size={size}
        aria-checked={checked}
        onClick={handleClick}
      >
        <StyledSwitch size={size} variant={variant} checked={checked} />
      </Wrapper>
      {align === "right" && (
        <Label htmlFor={id} size={size} align={align}>
          {checked ? label.on : label.off}
        </Label>
      )}
    </Container>
  );
};

export default Switch;

const Container = styled.div`
  margin-left: 0;
  margin-right: 0;
  display: inline-block;
`;

const Wrapper = styled.button<Pick<SwitchProps, "size">>`
  display: inline-block;
  ${(props) => getWrapperHeight(props)}
  padding: 0;
  margin: 0;
  vertical-align: middle;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const StyledSwitch = styled.span<
  Pick<SwitchProps, "size" | "variant" | "checked">
>`
  box-sizing: border-box;
  display: inline-block;
  ${(props) => getSwitchSize(props)};
  margin: 0;
  padding: 0;
  ${(props) => getSwitchStyle(props)};
  border-radius: 999px;
  transition: background 0.5s;

  &::after {
    content: "";
    display: block;
    ${(props) => getSwitchHandleSize(props)}
    ${(props) => getSwitchHandleStyle(props)}
    border-radius: 50%;
    transition: margin-top 0.5s, margin-left 0.5s;
  }
`;

const Label = styled.label<Pick<SwitchProps, "size" | "align">>`
  ${(props) => getLabelSize(props)}
  ${(props) => getLabelStyle(props)};
  color: ${({ theme }) => theme.colors.text.primary};
  vertical-align: text-top;
  cursor: pointer;
`;
