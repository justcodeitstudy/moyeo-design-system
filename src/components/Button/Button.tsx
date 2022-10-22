import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import buttonStyles from "./style";

type Color = "primary" | "general" | "success" | "warning" | "danger";
type Variants = "filled" | "outlined" | "text";
type IconPosition = "start" | "end";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  variants?: Variants;
  disabled?: boolean;
  width?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  color = "primary",
  variants = "filled",
  disabled = false,
  onClick,
  width,
  startIcon,
  endIcon,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      color={color}
      variants={variants}
      disabled={disabled}
      onClick={onClick}
      width={width}
      {...rest}
    >
      {startIcon && (
        <IconContainer position="start">
          {React.isValidElement(startIcon) &&
            React.cloneElement(startIcon, {
              ...startIcon.props,
              color: startIcon.props.color ?? color,
            })}
        </IconContainer>
      )}
      {children}
      {endIcon && (
        <IconContainer position="end">
          {React.isValidElement(endIcon) &&
            React.cloneElement(endIcon, {
              ...endIcon.props,
              color: endIcon.props.color ?? color,
            })}
        </IconContainer>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ width }) => width};
  height: 40px;
  padding: 8px 16px;
  border-radius: 6px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  ${({ onClick }) => !onClick && `pointer-events: none`};
  ${({ theme }) => theme.typography.md};
  ${({ color }) => color && buttonStyles.colors[color]};
  ${({ variants }) => variants && buttonStyles.variants[variants]};

  &:disabled {
    pointer-events: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.general[200]};
    color: ${({ theme }) => theme.colors.text.third};
  }
`;

const IconContainer = styled("div")<{ position: IconPosition }>`
  padding-top: 3px;
  ${({ position }) => {
    switch (position) {
      case "start": {
        return css`
          margin-right: 4px;
        `;
      }
      case "end": {
        return css`
          margin-left: 4px;
        `;
      }
    }
  }}
`;
