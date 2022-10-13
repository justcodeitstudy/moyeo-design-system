import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import buttonStyles from "./style";

type Color = "primary" | "general" | "success" | "warning" | "danger";
type Variants = "filled" | "outlined" | "text";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  variants?: Variants;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  color = "primary",
  variants = "filled",
  disabled = false,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      color={color}
      variants={variants}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 70px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 6px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
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
