import { Icon, IconName } from "../Icon";
import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type Color = "primary" | "general";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  color?: Color;
  size?: number;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({
  color = "general",
  disabled,
  icon,
  size = 18,
  onClick,
  ...rest
}: IconButtonProps) => {
  return (
    <StyledIconButton
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <Icon name={icon} color={color} size={size} />
    </StyledIconButton>
  );
};

export default IconButton;

const StyledIconButton = styled("button")`
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
  padding: 6px;
  border-radius: 8px;
  display: inline-flex;
  overflow: hidden;
  border: none;
  min-width: 36px;
  min-height: 36px;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
  }

  ${({ color }) => {
    switch (color) {
      case "primary": {
        return css`
          background-color: ${({ theme }) => theme.colors.primary[500]};
          color: ${({ theme }) => theme.colors.general.white};
        `;
      }
      case "general": {
        return css`
          background-color: ${({ theme }) => theme.colors.general[200]};
          color: ${({ theme }) => theme.colors.general[600]};
        `;
      }
    }
  }}
`;
