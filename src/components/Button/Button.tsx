import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  status?: Status;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

type Size = "medium" | "large";

type Status = "primary" | "secondary" | "basic" | "danger";

const generateStatusStyle = (status?: Status) => {
  switch (status) {
    case "primary":
      return css`
        color: #ffffff;
        background: #12d4ff;

        &:hover:enabled {
          background: #6be4ff;
        }

        &:active:enabled {
          background: #00b1e9;
        }
      `;
    case "secondary":
      return css`
        color: #444444;
        background: #ffffff;
        border: 1px solid #d9d9d9;

        &:hover:enabled {
          color: #6be4ff;
          background: #ffffff;
          border: 1px solid #6be4ff;
        }

        &:active:enabled {
          font-weight: 500;
          color: #00b1e9;
          background: #ffffff;
          border: 1px solid #00b1e9;
        }
      `;
    case "danger":
      return css`
        color: #ffffff;
        background: #ff3d3d;

        &:hover:enabled {
          background: #ff8383;
        }

        &:active:enabled {
          background: #ea2222;
        }
      `;
    case "basic":
    default:
      return css`
        color: #444444;
        background: none;

        &:hover:enabled {
          background: #fafafa;
        }

        &:active:enabled {
          background: #d9d9d9;
        }
      `;
  }
};

const generateSizedStyle = (size?: Size) => {
  switch (size) {
    case "large":
      return css`
        height: 38px;
        padding: 12px 24px;
      `;
    case "medium":
    default:
      return css`
        height: 30px;
        padding: 8px 16px;
      `;
  }
};

const Button = ({
  size = "medium",
  status = "basic",
  disabled = false,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      status={status}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  height: 30px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    color: #ffffff;
    background: #e5e5e5;
  }

  ${({ size }) => generateSizedStyle(size)};
  ${({ status }) => generateStatusStyle(status)}
`;
